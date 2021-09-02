const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const orderShema = new mongoose.Schema({
    order: {
        type: ObjectId,
        ref: 'Hotel'
    },
    orderedBy: {
        type: ObjectId,
        ref: 'User'
    },
    session: {}
}, 
    {timestamps: true}
)

module.exports = mongoose.model('Order', orderShema);
