import React, { useState } from 'react'
import { DatePicker, Select } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import AlgoliaPlaces from 'algolia-places-react'
import moment from 'moment'
import { useHistory } from 'react-router-dom'


const { Option } = Select
const { RangePicker } = DatePicker

const config = {
    appId: process.env.REACT_APP_ALGOLIA_ID,
    apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
    language: 'en',
}

const Search = () => {

    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [bed, setBed] = useState('');
    const history = useHistory();

    const handleSubmit = async () => {
        if(!location && !date && !bed) return;
        history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`);  
    }

    return (
        <div className="d-flex pb-4 search_bar">
            <div className="w-100">
                <AlgoliaPlaces
                    placeholder="Where you want to go?"
                    defaultValue={location}
                    Option={config}
                    onChange={({ suggestion }) => setLocation(suggestion.value)}
                    style={{ height: '50px' }}
                />
            </div>
            <RangePicker
                className="w-100 rangePicker"
                onChange={(value, dateString) => setDate(dateString)}
                disabledDate={(current) =>
                    current && current.valueOf() < moment().subtract(1, 'days')}
            />
            <Select
                onChange={(value) => setBed(value)}
                className="w-100"
                size="large"
                placeholder="Number of beds"
            >
                <Option key={1}>{1}</Option>
                <Option key={2}>{2}</Option>
                <Option key={3}>{3}</Option>
                <Option key={4}>{4}</Option>
            </Select>

            <SearchOutlined
                className="btn btn-primary p-3 btn-square"
                onClick={handleSubmit}
            />
        </div>
    )
}

export default Search
