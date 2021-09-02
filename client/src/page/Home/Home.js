import React, { useState, useEffect } from 'react'
import { getHotel } from '../../actions/hotel'
import SmallCard from '../../components/smallCard/SmallCard';
import TopNavBar from '../../components/TopNavBar/TopNavBar'
import Search from '../hotel/Search';

const Home = () => {

    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        loadHotel()
    },[])

    const loadHotel = async () => {
        const res = await getHotel();
        setHotels(res.data.hotels);
    }


    return (
        <TopNavBar>
            <div className="text-center p-4 mt-2 header bg-secondary">
                <h2>All Hotels</h2>
            </div>
            <div>
                <br/>
                <Search />
            </div>
            <div className="container-fluid mt-2">
                {
                    hotels.map((h, idx) => (
                        <SmallCard 
                            key={idx} 
                            hotel={h}
                        />
                    ))
                }
            </div>
        </TopNavBar>
    )
}

export default Home
