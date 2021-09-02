const User = require('../models/user');
const Hotel = require('../models/hote');
const Order = require('../models/order');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRETE);
const queryString = require('query-string');
const { hotelOwner } = require('../middleware');

exports.createConnectAccount = async (req, res) => {
    const user = await User.findById(req.user._id).exec();

    // if user doesn't have stripe_account_id yet, create now
    try {
        if (!user.stripe_account_id) {
            const account = await stripe.accounts.create({
                type: 'standard'
            })
            // console.log(account);
            user.stripe_account_id = account.id;
            user.save();
        }
        // create login link based on account id (for front end to complete onboarding)
        let accountLink = await stripe.accountLinks.create({
            account: user.stripe_account_id,
            refresh_url: process.env.STRIPE_REDIRECT_URL,
            return_url: process.env.STRIPE_REDIRECT_URL,
            type: 'account_onboarding'
        })
        // prefill any info such as email
        accountLink = Object.assign(accountLink, {
            'stripe_user[email]': user.email || undefined
        })
        res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`)
        // update payment schedule 

    } catch (error) {
        console.log(error);
    }
}


exports.getAccountStatus = async (req, res) => {
    const user = await User.findById(req.user._id).exec();
    let account = await stripe.accounts.retrieve(user.stripe_account_id);

    const updateUser = await User.findByIdAndUpdate(user._id,
        {
            $set: {
                stripe_seller: account
            }
        },
        { new: true }
    )
        .select('-password')
        .exec()
    res.status(200).json(updateUser);
}


exports.getAccountBalance = async (req, res) => {

    const user = await User.findById(req.user._id);

    try {
        const accountBalance = await stripe.balance.retrieve({
            stripeAccount: user.stripe_account_id
        });
        res.status(200).json(accountBalance)
    } catch (error) {
        console.log(error);
    }
}


exports.payoutSetting = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).exec();
        const loginLink = await stripe.accounts.createLoginLink(
            user.stripe_account_id,
            {
                redirect_url: process.env.STRIPE_SETTING_REDIRECT_URL
            }
        )
        res.status(200).json(loginLink)
    } catch (error) {
        console.log(error);
    }
}


//----- get session id of user & send it to frontend -----//

exports.stripeSessionId = async (req, res) => {

    try {
        // 1. get hotel Id from req.body
        const { hotelId } = req.body;
        // 2. find the hotel from the database
        const item = await Hotel.findById(hotelId).populate('postedBy', '_id name stripe_account_id').exec();
        // console.log(item);
        // 3. 20% charge as application fee
        const fees = (item.price * 20) / 100
        // 4. create a session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            // 5. purchasing item details, it will be shown to user on checkout
            line_items: [{
                name: 'Hotel bookeng',
                amount: item.price,
                currency: 'inr',
                quantity: 1,
            }],
            // 6. create payment intent with application fee and description charge 80%
            payment_intent_data: {
                application_fee_amount: fees,
                transfer_data: {
                    destination: item.postedBy.stripe_account_id,
                },
            },
            success_url: `${process.env.STRIPE_SUCCESS_URL}${item._id}`,
            cancel_url: process.env.STRIPE_CANCEL_URL,
        });

        // 7. add this session object to nuser db
        await User.findByIdAndUpdate(req.user._id, 
            { stripeSession: session }).exec();
        // 8. send session Id as response to the frontend
        res.status(200).json({
            sessionId: session.id
        })

    } catch (error) {
        console.log(error);
    }
}


exports.stripeSuccess = async (req, res) => {
    try {
        // 1. get hotel Id from req.body
        const { hotelId } = req.body;

        // 2. find the current loggedIn user from the database
        const user = await User.findById(req.user._id).exec();

        // 3. retrieve stripe session Id as we save previously
        const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id);
        if(!user.stripeSession) return;
        // 4. if session payment status is paid, create order
        if (session.payment_success === "paid") {

            // 5. check if order with that session Id already exist
            const orderExist = await Order.findOne({ "session.id": session.id });

            if (orderExist) {
                // 6. If order exis, send success true
                res.json({ success: true });
                
            } else {
                // 7. create new order & send success true
                const newOrder = await new Order({
                    hotel: hotelId,
                    session,
                    orderedBy: user._id
                }).save();

                // 8. remove the session Id from logged in user db
                await User.findByIdAndUpdate(user._id, {
                    $set: { stripeSession: {} }
                }).exec();

                res.json({ success: true });
            }
        }
    } catch (error) {
        console.log(error);
    }
}