const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

// user register
exports.userRegister = async (req, res) => {
    const { name, email, password } = req.body;

    if( !name || !email || !password ) {
        return  res.status(400).send('All fields are required');
    }

        const user = await User.findOne({ email })
        if(user) return res.status(400).send('User is already registered. Go to Login')
    
        try {
            const newUser = new User(req.body);
            await newUser.save((err, userData) => {
                if(err) return res.status(400).json(err);
                if(userData) res.status(200).json({
                    message: 'User registered successfully!'
                })
            })
        } catch (error) {
            res.status(500).json(error)
        }
}

// user login
exports.userLogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email }).exec();
        if(!user) return res.status(400).send('User with that email not found!');
    
        const validPassword = await bcrypt.compare(password, user.password);
    
        if(validPassword) {
            const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRETE, { expiresIn: '7d'});
            const { _id, name, email, createdAt, stripe_account_id, stripe_seller, stripeSession } = user

            res.status(200).json({ 
                token,
                user: { _id, name, email, createdAt, stripe_account_id, stripe_seller, stripeSession }
            });
        } else {
            res.status(400).send('Wrong password');
        }
    } catch (error) {
        res.status(400).json(error);
    }
   
}
