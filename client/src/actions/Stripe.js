import axios from '../helper/axios'

export const createConnectAcoount = async (token) => 
    await axios.post('/create-connect-account',
    {}, 
    {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }
);

export const getAccountStatus = async (token) => 
    await axios.post('/get-account-status',
    {}, 
    {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }
);

export const getAccountBalance = async (token) => 
    await axios.post('/get-account-balance',
    {}, 
    {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }
);

export const payoutSetting = async (token) => 
    await axios.post('/payout-setting',
    {}, 
    {
        headers: {
            Authorization: `Bearer ${token}` 
        }
    }
);


export const getStripeSessionId = async (token, hotelId) =>
    await axios.post(`/stripe-session-id`, 
    {
        hotelId
    }, 
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)

export const stripeSuccessRequest = async (token, hotelId) =>
    await axios.post(`/stripe-success`, 
    {
        hotelId
    },
    {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
)










