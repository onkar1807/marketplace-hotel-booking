const express = require('express');
const { getUserBooking, isAlreadyBooked } = require('../controllers/orderController');
const { requireSignin } = require('../middleware');
const router = express.Router();

router.get('/user-hotel-booking', requireSignin, getUserBooking);

router.get('/is-already-booked/:hotelId', requireSignin, isAlreadyBooked);

module.exports = router;