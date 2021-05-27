import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../contexts/CartContext';
import { UserContext } from '../contexts/UserContext';
import { MessageContext } from '../contexts/MessageContext';
import env from 'react-dotenv'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

const ShoppingCart = () => {
    // contexts
    const { cartState, totalState, orderTotal, getCart, addToCart, removeFromCart } = useContext(CartContext);
    const [ cart, setCart ] = cartState;
    const [ total, setTotal ] = totalState;
    const { verifyUser } = useContext(UserContext);
    const { displayMessage, clearMessage } = useContext(MessageContext);

    // states
    const [checkingOut, setCheckingOut] = useState(false);
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zip, setZip] = useState('');
    const [state, setState] = useState('');
    const [card, setCard] = useState('');
    const [redirect, setRedirect] = useState('');

    // on component load
    useEffect(getCart, []);
    useEffect(clearMessage, []);

    const handleCheckout = (e) => {
        e.preventDefault()
        if (address === '' || city === '' || zip === '' || state === '' || card === '')
        {
            displayMessage(false, 'All fields are required for checking out. Please fill in any empty fields.')
            return
        }
        createOrder()
        setCart([])
        setCheckingOut(false)
    }

    const createOrder = async () => {
        const userId = localStorage.getItem('userId')
        let res = await axios.post(`${env.BACKEND_URL}/orders`,{
            address: address,
            city: city,
            state: state,
            zip: zip,
            cart: cart,
            total: total,
            card: card
        }, {
            headers: {
                Authorization: userId
            }
        })
        verifyUser()
    }


    return (
        <div className="cart-container">
            { redirect ? <Redirect to={redirect} /> : null }
            { checkingOut ?
                <form className="checkout-form" onSubmit={handleCheckout}>
                    <div className="checkout-container">
                        <div className="checkout-labels">
                            <label htmlFor="address">Shipping Address</label>
                            <label htmlFor="city">City</label>
                            <label htmlFor="state">State</label>
                            <label htmlFor="zip">Zip Code</label>
                            <label htmlFor="credit">Credit Card</label>
                        </div>
                        <div className="checkout-inputs">
                            <input id="address" type="text" value={address} placeholder="Address" onChange={(e) => {setAddress(e.target.value)}} />
                            <input id="city" type="text" value={city} placeholder="City" onChange={(e) => {setCity(e.target.value)}} />
                            <input id="state" type="text" value={state} placeholder="State" onChange={(e) => {setState(e.target.value)}} />
                            <input id="zip" type="text" value={zip} placeholder="Zip" onChange={(e) => {setZip(e.target.value)}} />
                            <input id="credit" type="text" value={card} placeholder="Card Number" onChange={(e) => {setCard(e.target.value)}} />
                        </div>
                    </div>
                    <div className="checkout-buttons">
                        <input type="submit" value="Submit Payment" />
                        <input id="cancel-checkout" type="button" value="Cancel" onClick={() => {setCheckingOut(false)}} />
                    </div>
                </form>
                :
                <div className="cart-display">
                    <h1>Your Cart</h1>
                    {/* if cart exists, check if cart is empty, display cart items if cart exists and is not empty, display loading message if cart doesn't exist */}
                    <div className="cart-items-container">
                    {cart ? cart.length === 0 ? 'Your cart is empty' : cart.map((item, i) => {return (
                        <div className="cart-item" key={i}>
                            <img className="cart-item-thumbnail" src={item.product.image} alt={item.product.name} width={100} height={100}/>
                            <span className="cart-item-name" onClick={() => {setRedirect(`/products/${item.product.id}`)}}>{item.product.name} - ${item.product.price}</span>
                            <input type="button" value="Remove" onClick={() => {removeFromCart(item.id)}} />
                        </div>
                    )
                    }) : 'Getting cart...'}
                    </div>
                </div>
            }
            {
                cart ? cart.length === 0 ?
                    null
                    :
                    <div className="cart-payment-container">
                        <span className="cart-total-price">Total: ${Math.round(total * 100) / 100}</span>
                        { checkingOut === false ? 
                        <span className="cart-checkout" onClick={()=>{
                            return setCheckingOut(true)
                        }}>Checkout</span>
                        :
                        null                           
                        }
                    </div>
                    : 
                    null
            }
        </div>
    )
}


export default ShoppingCart