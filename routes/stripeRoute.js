const express = require('express');
// const { createOrder } = require('../controllers/orderController');
const { createConnectAccount,  
        getAccountStatus, 
        getAccountBalance, 
        payoutSetting,
        stripeSessionId,
        stripeSuccess } = require('../controllers/stripeController');
const { requireSignin } = require('../middleware');
const router = express.Router();

//------ STRIPE -------//
router.post('/create-connect-account', requireSignin, createConnectAccount);

router.post('/get-account-status', requireSignin, getAccountStatus);

router.post('/get-account-balance', requireSignin, getAccountBalance);

router.post('/payout-setting', requireSignin, payoutSetting);

router.post('/stripe-session-id', requireSignin, stripeSessionId);


//------ ORDER -------//
router.post('/stripe-success', requireSignin, stripeSuccess); 

module.exports = router;