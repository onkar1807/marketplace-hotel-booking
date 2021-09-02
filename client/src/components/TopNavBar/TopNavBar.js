import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { FaAlignLeft } from 'react-icons/fa'


const TopNavBar = (props) => {

    const dispatch = useDispatch()
    const { auth }  = useSelector((state) => ({...state}))
    const history = useHistory()

    const [isOpen, setIsOpen] = useState(false)

    const logout = () => {
        dispatch({
            type: "LOGOUT",
            payload: null
        })
        window.localStorage.clear()
        history.push('/login')
    }

    return (
        <>
            <div className="nav bg-light d-flex justify-content-between align-items-center">
                <Link className="nav-link" to="/">
                    Home
                </Link>

               
                <div className="d-flex rightBar_menu">
                    {auth !== null && 
                        <>  
                            <Link className="nav-link" to="/dashboard">
                                Dashboard
                            </Link>
                            <Link className="nav-link pointer" onClick={logout}>
                                logout
                            </Link>
                        </>
                    }

                    {auth === null &&
                        <>
                            <Link className="nav-link" to="/login">
                                Login
                            </Link>
                            <Link className="nav-link" to="/register">
                                Register
                            </Link>
                        </>
                    }
                </div>
            </div>
            {props.children}
        </>
    )
}

export default TopNavBar
