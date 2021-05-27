import { UserContext } from '../contexts/UserContext'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import env from 'react-dotenv'
import { Redirect } from 'react-router'

// components
import Order from '../components/Order'

const Orders = () => {
    // contexts
    const {userState} = useContext(UserContext)
    const [user] = userState

    return (
        <div key="profile-display" className="profile-display">
            <div className="orders-container">
                { user.orders ? user.orders.length === 0 ? 'You have no orders' : user.orders.map((order, i) => {
                    return (
                        <Order key={i} order={order} />
                    )
                }) : 'Getting orders...'}
            </div>
        </div>
    )
}


export default Orders