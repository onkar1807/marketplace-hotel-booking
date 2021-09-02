import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import TopNavBar from '../../components/TopNavBar/TopNavBar'
import { searchListing } from '../../actions/hotel'

const SearchResultPage = () => {

    const [searchLocation, setSearchLocation] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [searchBed, setSearchBed] = useState('');
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const { location, bed, date } = queryString.parse(window.location.search);
        searchListing({ location, bed, date }).then(res => {
            setHotels(res.data.result)
        })
    },[window.location.search])

    return (
        <TopNavBar>
            <div className="container">
                <div className="row">
                    Search result
                </div>
            </div>

            <div className="container-fluid">
                <pre>{JSON.stringify(hotels, null, 4)}</pre>
            </div>
        </TopNavBar>
    )
}

export default SearchResultPage
