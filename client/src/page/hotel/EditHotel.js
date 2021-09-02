import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { editHotel, getHotelById } from '../../actions/hotel'
import TopNavBar from '../../components/TopNavBar/TopNavBar'
import { toast } from 'react-toastify'
import AlgoliaPlaces from 'algolia-places-react'
import { DatePicker, Select } from 'antd'
import moment from 'moment'
import { API } from '../../urlConfig'

const { Option } = Select

const config = {
    appId: process.env.REACT_APP_ALGOLIA_ID,
    apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
    language: 'en',
}

const EditHotel = ({match}) => {

    const {auth} = useSelector(state => ({...state}))

    const [values, setValues] = useState({
        title: '',
        content: '',
        price: '',
        from: '',
        to: '',
        bed: '',
        location: ''
    })


    const [preview, setPreview] = useState(
        "https://via.placeholder.com/100.png?text=PREVIEW"
    )

    const [image, setImage] = useState('');
    const { title, content, price, location, from, bed, to } = values;

    
    useEffect(() => {
        sellerHotel()
    },[])

    const sellerHotel = async () => {
        const res = await getHotelById(match.params.hotelId)
        setValues({...values, ...res.data})
        setPreview(`${API}/hotel/image/${res.data._id}`)
    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let formdata = new FormData();
        formdata.append('title', title)
        formdata.append('content', content)
        formdata.append('price', price)
        formdata.append('from', from)
        formdata.append('to', to)
        formdata.append('bed', bed)
        formdata.append('location', location)
        image && formdata.append('image', image)

        try {
            const {data} =  await editHotel(auth.token, formdata, match.params.hotelId)
            toast.success(`${data.title} is updated...`)
        } catch (error) {
            toast.error(error.response.data)
        }
        
    }

    const handleForm = () => (

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label className="btn btn-outline-secondary m-2 text-left">
                    Image
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        hidden
                        onChange={handleImageChange} />
                </label>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="form-control m-2"
                    value={title}
                    onChange={handleChange} 
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    className="form-control m-2"
                    value={content}
                    onChange={handleChange} 
                />

                {location && location.length > 0 &&
                    <AlgoliaPlaces 
                        className="form-control ml-2 mr-2"
                        placeholder="Location"
                        defaultValue={location}
                        option={config}
                        onChange={({suggestion}) => setValues({...values, location: suggestion.value})}
                    />
                }

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    className="form-control m-2"
                    value={price}
                    onChange={handleChange} 
                />
                <Select 
                    onChange={(value) => setValues({...values, bed: value}) }
                    className="w-100 m-2" 
                    size="large"
                    value={bed}
                    placeholder="No of Beds">
                        <Option key={1}>{1}</Option>
                        <Option key={2}>{2}</Option>
                        <Option key={3}>{3}</Option>
                        <Option key={4}>{4}</Option>
                </Select>
            </div>

                {from && <DatePicker
                    defaultValue={moment(from, 'YYYY-MM-DD')}
                    placeholder="From date"
                    className="form-control m-2" 
                    onChange={(dateString) => 
                        setValues({...values, from: dateString})}
                    disabledDate={(current) => 
                        current && current.valueOf() < moment().subtract(1, 'days')}
                />}
                {to && <DatePicker
                    defaultValue={moment(to, 'YYYY-MM-DD')}
                    placeholder="To date"
                    className="form-control m-2" 
                    onChange={(dateString) => 
                        setValues({...values, to: dateString})}
                    disabledDate={(current) => 
                        current && current.valueOf() < moment().subtract(1, 'days')}
                />}
            <button 
                className="btn btn-outline-primary m-2"
                type="submit"
                >
                    Save
            </button>
        </form>
    )

    return (
        <TopNavBar>
            <>
                <div className="text-center p-4 mt-2 header bg-secondary">
                    <h2>Edit Hotel</h2>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-9">
                            {handleForm()}
                        </div>
                        <div className="col-md-3">
                           <img 
                            src={preview} 
                            alt="preview_image" 
                            className="img img-fluid m-2" 
                        />
                        </div>
                        {/* <pre>{JSON.stringify(values, null, 4)}</pre> */}
                    </div>
                </div>
            </>
        </TopNavBar>
    )
}

export default EditHotel


       