import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest}) => {
    return  <Route {...rest} 
            component={(props) => {
                const auth = window.localStorage.getItem('auth');
                if(auth) {
                    return <Component {...props} />
                } else {
                    return <Redirect to="/login" />
                }
            }}
        />
}

export default PrivateRoute
