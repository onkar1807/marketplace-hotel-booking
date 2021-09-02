import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getuserBooking } from '../actions/hotel'
import { useSelector } from 'react-redux'
import ConnectNav from '../components/nav/ConnectNav'
import DashboardNav from '../components/nav/DashboardNav'
import BookingCard from '../components/smallCard/BookingCard'
import TopNavBar from '../components/TopNavBar/TopNavBar'


const Dashboard = () => {

    const {auth} = useSelector(state => ({...state}));
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        getHotelBooking()
    },[])

    const getHotelBooking = async () => {
        const res = await getuserBooking(auth.token);
        setBookings(res.data.booking)
    }

    return (
        <TopNavBar>
            <div className="container-fluid bg-secondary p-5 text-center">
                <ConnectNav />
            </div>

            <div className="container-fluid p-4">
                <DashboardNav />
            </div>

            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-10">
                        <h2>Your Bookings</h2>
                    </div>
                    <div className="col-md-2">
                        <Link to='/' className="btn btn-primary">Browse Hotels</Link>
                    </div>
                </div>
            </div>

            <div className="row">
                {   bookings.map((b, idx) => (
                        <BookingCard 
                            key={idx} 
                            hotel={b.hotel}
                            session={b.session}
                            orderdBy={b.orderedBy} 
                        />
                    ))
                }
            </div>
        </TopNavBar>
    )
}

export default Dashboard
