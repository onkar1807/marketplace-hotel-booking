import React, { useEffect, useState } from 'react'
import { diffDays } from '../../actions/hotel'
import { useHistory, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { API } from '../../urlConfig'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Loader from 'react-loader-spinner'


const SmallCard = ({ 
    hotel, 
    seller = false, 
    showMoreButton = true ,
    handleHotelDelete = (f) => f
}) => {
   
    const { auth } = useSelector(state => ({ ...state }))
    const [image, setImage] = useState('');
    const history = useHistory()

    useEffect(() => {
        setImage(`${API}/hotel/image/${hotel._id}`)
    })

    const currencyFormatter = (data) => {
        return (data.amount).toLocaleString(data.currency, {
            style: "currency",
            currency: data.currency
        })
    }

    return (
        <>
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        {hotel.image &&  hotel.image.contentType ? (
                                <img
                                    src={image} 
                                    alt="no img"
                                    className="card-image img img-fluid"
                                />
                            ) : (
                                <Loader
                                    type="Puff"
                                    color="Blue" 
                                    height={50}
                                    width={50}
                               />
                            )
                        }
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h3 className="card-title">{hotel.title}{" "}
                                <span className="text-primary">
                                    {currencyFormatter({
                                        amount: hotel.price,
                                        currency: 'Inr'
                                    })}
                                </span>
                            </h3>
                            <p className="alert alert-info">{hotel.location}</p>
                            <p className="card-text">{`${hotel.content.substring(1, 100)}...`}</p>
                            <p className="card-text">
                                <span className="text-primary">
                                    for {diffDays(hotel.from, hotel.to)}{" "}
                                    {diffDays(hotel.from, hotel.to) >= 1 ? "day" : "days"}
                                </span>
                            </p>
                            <p className="card-text">Bed {hotel.bed}</p>
                            <p className="card-text">
                                Available from {new Date(hotel.from).toLocaleDateString()}
                            </p>
                                <div className="d-flex justify-content-between h4">
                                    { showMoreButton && 
                                        <button
                                            onClick={() => history.push(`/hotel/${hotel._id}`)}
                                            className="btn btn-primary">
                                            Show more
                                        </button>
                                    }
                                    { seller &&
                                        <>
                                            <Link to={`/hotel/edit/${hotel._id}`}>
                                                <EditOutlined className="text-warning" />
                                            </Link>
                                            <DeleteOutlined
                                                className="text-danger"
                                                onClick={() => handleHotelDelete(hotel._id)}
                                            />
                                        </>
                                    }
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SmallCard
