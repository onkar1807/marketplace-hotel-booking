import React from 'react'
import TopNavBar from '../components/TopNavBar/TopNavBar'

const StripeFailed = () => {
    return (
        <TopNavBar>
            <div className="container">
                <div className="text-center">
                    <h1>Payment failed. Try again...</h1>
                </div>
            </div>
        </TopNavBar>
    )
}

export default StripeFailed
