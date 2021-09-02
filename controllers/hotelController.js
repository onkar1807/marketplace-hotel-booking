const Hotel = require('../models/hote');
const fs = require('fs');

exports.createHotel = async (req, res) => {
    const fields = req.fields;
    try {
        const newHotel = await new Hotel(fields);
        newHotel.postedBy = req.user._id

        if(req.files.image) {
            newHotel.image.data = fs.readFileSync(req.files.image.path);
            newHotel.image.contentType = req.files.image.type
        }

        newHotel.save((err, hotel) => {
            if(err) return res.status(400).send('Error');
            res.status(200).json({ hotel })
    })
    } catch (error) {
        console.log(error);
    }
}

exports.getHotel = async (req, res) => {
    // from: { $gte: new Date() }
    let hotels = await Hotel.find({})
    .limit(24)
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec()

    res.status(200).json({ hotels })
}

exports.getImage = async (req, res) => {
    const hotel = await Hotel.findById(req.params.hotelId).exec();
    if(hotel && hotel.image && hotel.image.data !== null) {
        res.set('Content-Type', hotel.image.contentType);
        return res.send(hotel.image.data);
    }
}

exports.getSellerHotel = async (req, res) => {
    const hotel = await Hotel.find({postedBy: req.user._id})
    .select("-image.data")
    .populate('postedBy', '_id name')
    .exec()

    res.status(200).json(hotel)
    
}

exports.getHotelById = async (req, res) => {
    
    const hotel = await Hotel.findById(req.params.hotelId)
    .select('-image.data')
    .populate('postedBy', '_id name')
    .exec()

    res.status(200).json(hotel)
}

exports.deleteHotel = async (req, res) => {
    try {
        await Hotel.findByIdAndDelete(req.params.hotelId).exec();
    } catch (error) {
        console.log(error);
    }
}

exports.updateHotel = async (req, res) => {
    try {
        let fields = req.fields;
        let files = req.files;

        let data = {...fields}

        if(files.image) {
            let image = {}
            image.data = fs.readFileSync(files.image.path);
            image.contentType = files.image.type;

            data.image = image;
        }

        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {new: true})
        .select('-image.data')
        res.status(200).json(updatedHotel)

    } catch (error) {
        console.log(error);
    }
}


//----- search query -------// 
exports.searchListing = async(req, res) => {
    const { location, bed, date } = req.body;
    console.log(req.body);
    // const fromDate = date.split(',')
    try {
        // let result = await Hotel.find({ 
        //     from: {$gte: new Date(fromDate[0])},
        //     location,
        //     bed
        // })
    
        // res.status(200).json(result)
    } catch (error) {
        console.log(error);
    } 
}

// let result = Hotel.find({ 
//     from: {$gte: new Date()},
//      to: {$lte: to},
//     location,
//     bed
// })