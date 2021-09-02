const express = require('express');
const { createHotel, 
        getHotel, 
        getImage, 
        deleteHotel, 
        getSellerHotel, 
        getHotelById,
        updateHotel,
        searchListing } = require('../controllers/hotelController');
        
const formidable = require('express-formidable')
const { requireSignin, hotelOwner } = require('../middleware');
const router = express.Router();

router.post('/create-hotel', formidable(), requireSignin, createHotel);

router.get('/hotels', getHotel);

router.get('/hotel/image/:hotelId', getImage);

router.get('/hotel-details/:hotelId',  getHotelById);

router.get('/seller-hotel', requireSignin, getSellerHotel);

router.delete('/delete-hotel/:hotelId', requireSignin, deleteHotel);

router.put('/update/hotel/:hotelId', formidable(), updateHotel);

router.get('/search-listings', searchListing);

module.exports = router;