import React, { useEffect } from 'react'
import TopNavBar from '../components/TopNavBar/TopNavBar'
import { useSelector } from 'react-redux'
import { stripeSuccessRequest } from '../actions/Stripe'
import { LoadingOutlined } from '@ant-design/icons'

const StripeSuccess = ({ match, history }) => {

    const { auth } = useSelector(state => ({...state}));

    useEffect(() => {
        stripeSuccessRequest(auth.token, match.params.hotelId)
        .then(res => {
           if(res.data.success) {
            console.log(res);
            history.push('/dashboard');
           } else {
            history.push('/stripe/cancel');
           }
        })
    },[match.params.hotelId])

    return (
        <TopNavBar>
            <div className="container">
                <div className="text-center p-5">
                    <LoadingOutlined 
                        className="display-1 text-danger" 
                    />
                </div>
            </div>
        </TopNavBar>
    )
}

export default StripeSuccess
