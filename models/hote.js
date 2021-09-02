const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const hotelSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required'
    },
    content: {
        type: String,
        required: 'Content is required',
        maxlength: 1000
    },
    location: {
        type: String,
    },
    price: {
        type: Number,
        required: 'Price is required',
        trim: true
    },
    postedBy: {
        type: ObjectId,
        ref: 'User',
    },
    image: {
        data: Buffer,
        contentType: String
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    bed: {
        type: Number
    }
},
    {timestamps: true}
)

module.exports = mongoose.model('Hotel', hotelSchema);