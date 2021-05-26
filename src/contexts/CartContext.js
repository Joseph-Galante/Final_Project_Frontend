import { useContext, useState, createContext } from 'react'
import env from 'react-dotenv'
import axios from 'axios'
import userEvent from '@testing-library/user-event'
import { UserContext } from '../contexts/UserContext'
import { MessageContext } from '../contexts/MessageContext'

const CartContext = createContext()

const CartProvider = ({children}) => {
    // contexts
    const {userState} = useContext(UserContext)
    const [user] = userState
    const { messageState, displayMessage } = useContext(MessageContext)
    const [message, setMessage] = messageState

    const [cart, setCart] = useState([])
    const [total, setTotal] = useState(0);
    const [prices, setPrices] = useState([0]);

    let orderTotal = 0;

    // functions

    // get cart
    const getCart = async () =>
    {
        // grab cart
        const res = await axios.get(`${env.BACKEND_URL}/cart`, {
            headers: { Authorization: user.id }
        })
        // console.log(res)
        res.data.cart.map((item) => {
            orderTotal = orderTotal + item.product.price
        })
        setTotal(orderTotal);
        // set cart to state
        setCart(res.data.cart);
    }

    // add item to cart
    const addToCart = async (productId) =>
    {
        // create item
        const res = await axios.post(`${env.BACKEND_URL}/cart`, {
            product_id: productId
        }, {
            headers: { Authorization: user.id }
        })
        // console.log(res.data.item);
        getCart();
        displayMessage(true, 'Item added to cart')
    }
    
    // remove item from cart
    const removeFromCart = async (id) =>
    {
        // delete item
        const res = await axios.delete(`${env.BACKEND_URL}/cart/${id}`, {
            headers: { Authorization: user.id }
        })
        // console.log(res.data.message);
        getCart();
    }

    const state = {
        cartState: [cart, setCart],
        getCart,
        addToCart,
        removeFromCart,
        totalState: [total, setTotal]
    }

    return (
        <CartContext.Provider value = {state}>
            {children}
        </CartContext.Provider>
    )
}

export { CartContext, CartProvider }