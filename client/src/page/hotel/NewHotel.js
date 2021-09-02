import React, { useState } from 'react'
import TopNavBar from '../../components/TopNavBar/TopNavBar'
import { toast } from 'react-toastify'
import AlgoliaPlaces, { log } from 'algolia-places-react'
import { DatePicker, Select } from 'antd'
import moment from 'moment'
import { createHotel } from '../../actions/hotel'
import { useSelector } from 'react-redux'

const { Option } = Select

const config = {
    appId: process.env.REACT_APP_ALGOLIA_ID,
    apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
    language: 'en',
}

const NewHotel = () => {

    const {auth} = useSelector(state => ({...state}))

    const [values, setValues] = useState({
        title: '',
        content: '',
        image: '',
        price: '',
        from: '',
        to: '',
        bed: ''
    })

    const [location, setLocation] = useState("")
    const [preview, setPreview] = useState(
        "https://via.placeholder.com/150.png?text=PREVIEW"
    )

    const { title, content, image, price, from, bed, to } = values;

    const handleSubmit = async (e) => {
        e.preventDefault();

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
            const res = await createHotel(auth.token, formdata);
            console.log(res);
            toast.success('New hotel is posted')
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (error) {
           if(error.response.status === 400 ) toast.error(error.response.data)
        }
    }

    const handleImageChange = (e) => {
        // console.log(e.target.files[0].name);
        setValues({...values, image: e.target.files[0]});
        setPreview(URL.createObjectURL(e.target.files[0]))
        
    }

    const handleChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
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

                <AlgoliaPlaces 
                    className="form-control ml-2 mr-2"
                    placeholder="Location"
                    defaultValue={location}
                    option={config}
                    onChange={({suggestion}) => setLocation(suggestion.value)}
                />

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
                    placeholder="No of Beds">
                        <Option key={1}>{1}</Option>
                        <Option key={2}>{2}</Option>
                        <Option key={3}>{3}</Option>
                        <Option key={4}>{4}</Option>
                </Select>
            </div>

                <DatePicker
                    placeholder="From date"
                    className="form-control m-2" 
                    onChange={(date, dateString) => 
                        setValues({...values, from: dateString})}
                    disabledDate={(current) => 
                        current && current.valueOf() < moment().subtract(1, 'days')}
                />
                <DatePicker
                    placeholder="To date"
                    className="form-control m-2" 
                    onChange={(date, dateString) => 
                        setValues({...values, to: dateString})}
                    disabledDate={(current) => 
                        current && current.valueOf() < moment().subtract(1, 'days')}
                />
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
                    <h2>Add New Hotel</h2>
                </div>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-10">
                            {handleForm()}
                        </div>
                        <div className="col-md-2">
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

export default NewHotel
