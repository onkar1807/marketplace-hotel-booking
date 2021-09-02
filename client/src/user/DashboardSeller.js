import ConnectNav from '../components/nav/ConnectNav'
import DashboardNav from '../components/nav/DashboardNav'
import TopNavBar from '../components/TopNavBar/TopNavBar'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { HomeOutlined } from '@ant-design/icons'
import { createConnectAcoount } from '../actions/Stripe'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { deleteHotel, getSellerHotel } from '../actions/hotel'
import SmallCard from '../components/smallCard/SmallCard'

const DashboardSeller = () => {

    const { auth } = useSelector(state => ({ ...state }));
    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        getHotel()
    },[])

    const getHotel = async () => {
        const res = await getSellerHotel(auth.token)
        setHotels(res.data)
    }

    const handleClick = async () => {
        setLoading(true)
        try {
            let res = await createConnectAcoount(auth.token)
            window.location.href = res.data
            setLoading(false)
        } catch (error) {
            console.log(error);
            toast.error('Stripe connect failed, Try again.'); 
            setLoading(false)
        }
    }

    const handleHotelDelete = async (id) => {
        if(!window.confirm('Are you sure?')) return 
        await deleteHotel(auth.token, id).then(res => {
            toast.success('Hotel deleted')
            getHotel()
        })
    }

    const connected = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-10">
                    <h2>Hotels</h2>
                </div>
                <div className="col-md-2">
                    <Link to='/hotels/new' className="btn btn-primary">+ Add new</Link>
                </div>
            </div>
            <div className="row">
                { hotels.map((h, idx) => (
                    <SmallCard 
                        key={idx} 
                        hotel={h} 
                        showMoreButton={false} 
                        seller={true}
                        handleHotelDelete={handleHotelDelete}  />
                    ))
                }
            </div>
            {/* {
                hotels.length <= 0 &&
                <div className="container-fluid offset-md-5">
                    <p>No hotel posted by yourself</p>
                </div>
            } */}
        </div>
        
    )

    const notConnected = () => (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center">
                    <div className="p-4 pointer">
                        <HomeOutlined className="h1" />
                        <h4>
                            Setup payouts to post hotel rooms
                        </h4>
                        <p className="lead">
                            partners with stripe to transfer earnings to Your bank account
                        </p>
                    </div>
                    <button 
                        disabled={loading}
                        className="btn btn-primary mb-3"
                        onClick={handleClick}
                    >
                        { loading ? 'Processing...' : 'Setup Payouts'}
                    </button>
                    <p className="text-muted">
                        <small>You'll be redirected to Stripe to complete the onboarding process</small>
                    </p>
                </div>
            </div>
        </div>
    )

    
    return (
        <TopNavBar>
            <div className="container-fluid bg-secondary p-5 text-center">
                <ConnectNav />
            </div>

            <div className="container-fluid py-4">
                <DashboardNav />
            </div>
           
            {
                auth &&
                    auth.user &&
                    auth.user.stripe_seller &&
                    auth.user.stripe_seller.charges_enabled ?
                    connected() : notConnected()
            }
        </TopNavBar>
    )
}

export default DashboardSeller
