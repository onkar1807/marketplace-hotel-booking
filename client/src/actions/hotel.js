import axios from '../helper/axios'

export const createHotel = async (token, data) => 
    await axios.post('/create-hotel', data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

export const getHotel = async () => 
    await axios.get('/hotels')


export const deleteHotel = async (token, hotelId) => 
    await axios.delete(`/delete-hotel/${hotelId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

export const getSellerHotel = async (token) => 
    await axios.get('/seller-hotel', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

export const getHotelById = async (hotelId) => 
    await axios.get(`/hotel-details/${hotelId}`)
    

export const editHotel = async (token, data, hotelId) => 
    await axios.put(`/update/hotel/${hotelId}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })


export const getuserBooking = async(token) => 
    await axios.get('/user-hotel-booking', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

export const hotelAlreadyBooked = async(token, hotelId) => {
    await axios.get(`/is-already-booked/${hotelId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const searchListing = async (query) => {
    await axios.get('/search-listings', query)
}


export const diffDays = (from, to) => {
    const day = 24 * 60 * 60 *1000
    const start = new Date(from)
    const end = new Date(to)
    const difference = Math.round(Math.abs(start - end) / day)
    return difference
}