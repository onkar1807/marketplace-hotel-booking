const expressJwt = require('express-jwt');
const Hotel = require('../models/hote');

exports.requireSignin = expressJwt({
    secret: process.env.JWT_SECRETE,
    algorithms: ["HS256"]
})

exports.hotelOwner = async (req, res, next) => {
    const hotel = await Hotel.findById(req.params.hotelId).exec();
    console.log(hotel)
    // const owner = hotel.postedBy._id.toString() === req.user._id.toString();

    // if(!owner) {
    //     res.status(400).send("Unauthorized")
    // }
    next()
}

