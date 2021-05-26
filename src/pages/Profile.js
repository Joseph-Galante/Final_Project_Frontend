// imports
import { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import env from 'react-dotenv'

// contexts
import { MessageContext } from '../contexts/MessageContext';
import { UserContext } from '../contexts/UserContext';

// components
import AccountInfo from '../components/AccountInfo';
import ShoppingCart from '../components/ShoppingCart';
import Orders from '../components/Orders';
import Product from '../components/Product';

const Profile = () =>
{
    // contexts
    const {userState, verifyUser } = useContext(UserContext);
    const [user, setUser] = userState;
    const { displayMessage, clearMessage } = useContext(MessageContext);

    // states
    const [display, setDisplay] = useState('account');
    const [products, setProducts] = useState([]);
    
    // on component load
    useEffect(clearMessage, [display]);

    const init = () =>
    {
        setDisplay('account')
        document.querySelectorAll('.menuItem').forEach(item => {item.classList.remove('active')});
        document.querySelector('#account').classList.add('active')
    }
    useEffect(init, [])

    const getProducts = () =>
    {
        axios.get(`${env.BACKEND_URL}/users/products`, { headers: { Authorization: localStorage.getItem('userId') }}).then((res) =>
        {
            // console.log(res)
            setProducts(res.data.products)
        }).catch(error => console.log(error.message))
    }
    useEffect(getProducts, [])

    return (
        <div className="profilePage">
            <div key="profileMenu" className="profileMenu">
                <div id="account" key="account" className="menuItem" onClick={() => {
                    setDisplay('account')
                    document.querySelectorAll('.menuItem').forEach(item => {item.classList.remove('active')});
                    document.querySelector('#account').classList.add('active');
                }}>
                    <h4>Account</h4>
                </div>
                <div id="cart" key="cart" className="menuItem" onClick={() => {
                    setDisplay('cart')
                    document.querySelectorAll('.menuItem').forEach(item => {item.classList.remove('active')});
                    document.querySelector('#cart').classList.add('active');
                }}>
                    <h4>Cart</h4>
                </div>
                <div id="products" key="products" className="menuItem" onClick={() => {
                    setDisplay('products')
                    document.querySelectorAll('.menuItem').forEach(item => {item.classList.remove('active')});
                    document.querySelector('#products').classList.add('active');
                }}>
                    <h4>Products</h4>
                </div>
                <div id="orders" key="orders" className="menuItem" onClick={() => {
                    setDisplay('orders')
                    document.querySelectorAll('.menuItem').forEach(item => {item.classList.remove('active')});
                    document.querySelector('#orders').classList.add('active');
                }}>
                    <h4>Orders</h4>
                </div>
            </div>
            {display === 'account' ?
                <AccountInfo />
                :
                display === 'cart' ?
                    <ShoppingCart />
                    :
                    display == 'products' ?
                        products ?
                            products.length === 0 ?
                                'You have no products'
                                :
                                products.map(product =>
                                {
                                    return <Product key={product.id} product={product} />
                                })
                                :
                                'Getting products...'
                            :
                            display == 'orders' ?
                                <Orders />
                                :
                                null
            }
        </div>
    )
}

export default Profile;