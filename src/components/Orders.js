import { UserContext } from '../contexts/UserContext'
import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import env from 'react-dotenv'

const Orders = () => {

    const {userState} = useContext(UserContext)
    const [user] = userState

    return (
        <div key="profileDisplay" className="profileDisplay">
            <div className="orders-container">
                { user.orders ? user.orders.length === 0 ? 'You have no orders' : user.orders.map((order, i) => {
                    return (
                        <div key={i}>
                            <span>{order.address}</span>
                            <div>
                                {order.cart_items.map((cartItem, i) => {
                                    return (
                                        <div key={i}>
                                            {cartItem.product.name}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }) : 'Getting orders...'}
            </div>
        </div>
    )
}


export default Orders