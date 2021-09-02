const Order = require('../models/order');

exports.getUserBooking = async (req, res) => {
    const booking = await Order.find({ orderedBy: req.user._id })
    .select('session')
    .populate('Hotel', '-image.data')
    .populate('orderedBy', '_id name')
    .exec();

    res.status(200).json({ booking });
}

exports.isAlreadyBooked = async (req, res) => {
    const { hotelId } = req.body;
    try {
        const userOrder = await Order.find({ orderedBy: req.user._id })
        .select('hotel')
        .exec();

        let ids = []

        for(let key of userOrder) {
            ids.push(key.hotel.toString());
        }

        res.json({
            ok: ids.includes(hotelId)
        })

    } catch (error) {
        console.log(error);
    }
}