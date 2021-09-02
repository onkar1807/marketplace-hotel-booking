import React, { useEffect, useState } from 'react'
import TopNavBar from '../../components/TopNavBar/TopNavBar'
import { diffDays, getHotelById, hotelAlreadyBooked } from '../../actions/hotel'
import { API } from '../../urlConfig';
import { useSelector } from 'react-redux'
import moment from 'moment'
import { getStripeSessionId } from '../../actions/Stripe';
import { loadStripe } from '@stripe/stripe-js'



const HotelDetails = ({ match, history }) => {

    const [hotels, setHotels] = useState([]);
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);
    const [isAlreadyBooked, setIsAlreadyBooked] = useState(false);
    const {auth} = useSelector(state => ({...state}))

    useEffect(() => {
        hotelDetails()
    },[])


    useEffect(() => {
        // if(auth && auth.token) {
        //     hotelAlreadyBooked(auth.token, match.params.hotelId)
        //     .then(res => {
        //         // console.log(res)
        //         setIsAlreadyBooked(res.data.ok);
        //     })
        // }
    },[auth, match.params.hotelId])

    const hotelDetails = async () => {
        const res = await getHotelById(match.params.hotelId);
        setHotels(res.data)
        setImage(`${API}/hotel/image/${match.params.hotelId}`)
    }

    const handleClick = async (e) => {
        e.preventDefault()

        if(!auth || !auth.token) {
            history.push('/login')
            return 
        }

        setLoading(true)
        if(!auth) history.push('/login')

        try {
            const res = await getStripeSessionId(auth.token, match.params.hotelId)
            const stripe = await loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);
               stripe.
                   redirectToCheckout({
                    sessionId: res.data.sessionId
                })

        } catch (error) {
            setLoading(false)
            console.log(error);
        }
    }

    return (
        <TopNavBar>
            <div className="text-center p-4 mt-2 header bg-secondary">
                <h2>{hotels.title}</h2>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-6">
                    <img 
                            src={image} 
                            alt={hotels.title} 
                            className="img img-fluid m-2"
                        />
                    </div>
                    <div className="col-md-6">
                        <br/>
                        <b>{hotels.content}</b>
                        <p className="alert alert-info mt-3">{hotels.price}</p>
                        <p className="card-text">
                            <span className="text-primary">
                                for {diffDays(hotels.from, hotels.to)}{" "}
                                {diffDays(hotels.from, hotels.to) <=1 ? 'day' : 'days'}
                            </span>
                        </p>
                        <p>from <br/>
                            {moment(hotels.from).format('MMMM Do YYYY, h:mm:ss a')}
                        </p>
                        <p>to <br/>
                            {moment(hotels.to).format('MMMM Do YYYY, h:mm:ss a')}
                        </p>
                        <i>Posted by <b>{hotels.postedBy && hotels.postedBy.name}</b></i>
                        <br/>
                            <button 
                                className="btn btn-primary btn-large mt-4"
                                onClick={handleClick}
                                disabled={loading || isAlreadyBooked}
                            >   
                                { isAlreadyBooked 
                                  ? "Already Booked"
                                    :loading 
                                        ? ("Loading...") 
                                        :
                                        (auth?.token ? 'Book Now' : "Login to Book")
                                }
                                
                            </button>
                    </div>
                </div>
            </div>
        </TopNavBar>
    )
}

export default HotelDetails
