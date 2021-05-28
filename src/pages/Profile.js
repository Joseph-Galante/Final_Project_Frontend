// imports
import { useState, useEffect, useContext } from 'react';
import axios from 'axios'
import env from 'react-dotenv'

// contexts
import { MessageContext } from '../contexts/MessageContext';
import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext';

// components
import AccountInfo from '../components/AccountInfo';
import ShoppingCart from '../components/ShoppingCart';
import Orders from '../components/Orders';
import Product from '../components/Product';
import AddProduct from '../components/AddProduct';
import UserReviews from '../components/UserReviews';

const Profile = () =>
{
    // contexts
    const {userState, verifyUser } = useContext(UserContext);
    const [user, setUser] = userState;
    const { messageState, displayMessage, clearMessage } = useContext(MessageContext);
    const [ message ] = messageState;
    const { cartState, totalState, checkCartState, orderTotal, getCart, addToCart, removeFromCart } = useContext(CartContext);
    const [ cart, setCart ] = cartState;
    const [ checkCart, setCheckCart ] = checkCartState;

    // states
    const [display, setDisplay] = useState('account');
    const [products, setProducts] = useState([]);
    
    // on component load
    useEffect(clearMessage, [display]);
    useEffect(getCart, []);

    const updateMenu = (tab) =>
    {
        clearMessage();
        getProducts();
        setDisplay(tab);
        document.querySelectorAll('.menu-item').forEach(item => {item.classList.remove('active')});
        document.querySelector(`#${tab}`).classList.add('active')
    }
    useEffect(() => {updateMenu('account')}, [])

    const resetCheckCart = () =>
    {
        if (checkCart) { updateMenu('cart'); setCheckCart(false) }
    }
    useEffect(resetCheckCart, [checkCart])

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
        <div className="profile-page">
            <div key="profile-menu" className="profile-menu">
                <div id="account" key="account" className="menu-item" onClick={() => {
                    updateMenu('account')
                }}>
                    <h4>Account</h4>
                </div>
                <div id="cart" key="cart" className="menu-item" onClick={() => {
                    updateMenu('cart')
                }}>
                    <h4>Cart ({cart ? cart.length : 0})</h4>
                </div>
                <div id="products" key="products" className="menu-item" onClick={() => {
                    updateMenu('products')
                }}>
                    <h4>Products</h4>
                </div>
                <div id="orders" key="orders" className="menu-item" onClick={() => {
                    updateMenu('orders')
                }}>
                    <h4>Orders</h4>
                </div>
                <div id="reviews" key="reviews" className="menu-item" onClick={() => {
                    updateMenu('reviews')
                }}>
                    <h4>Reviews</h4>
                </div>
                <div id="create-product" key="create-product" className="menu-item" onClick={() => {
                    updateMenu('create-product')
                }}>
                    <h4>Add Product</h4>
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
                                    return <Product key={product.id} product={product} getProducts={getProducts}/>
                                })
                                :
                                'Getting products...'
                            :
                            display == 'orders' ?
                                <div className="order-list">
                                    <h3 style={{color: 
                                    "hsl(0, 0%, 90%)"}}>Note: The Anduin Team is not responsible for any fluctuations in any item's price. All orders show the items' current prices. The total for each order reflects the price of each item at the time of purchase.</h3>
                                    <Orders />
                                </div>
                                :
                                display == 'create-product' ?
                                <AddProduct updateMenu={updateMenu}/>
                                :
                                display === 'reviews' ?
                                        <UserReviews />
                                        :
                                        null
            }
        </div>
    )
}

export default Profile;