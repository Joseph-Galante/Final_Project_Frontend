// link
import { Link } from 'react-router-dom'

// contexts
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext';

// components
import Messages from '../components/Messages'


const NavBar = () =>
{
    // contexts
    const { userState } = useContext(UserContext);
    const [user, setUser] = userState;
    const { cartState, checkCartState, getCart } = useContext(CartContext);
    const [ cart ] = cartState;
    const [ checkCart, setCheckCart ] = checkCartState;

    // states
    const [ cartItems, setCartItems ] = useState(0)

    // on component load
    useEffect(() => {
        if (user.id) { getCart() }
    }, [user])

    // functions
    const logoutUser = () =>
    {
        localStorage.removeItem('userId');
        setUser({});
    }

    const cartIcon = () =>
    {
        const num = cart.length
        setCartItems(num)
    }
    useEffect(cartIcon, [cart])

    return (
        <nav>
            {user.id ?
                <span>
                    <span className="navLeft">
                        <Link className="navLink" className="home-logo" to="/">
                            <img src={"https://i.imgur.com/WNAgEe6.png"} />
                        </Link>
                    </span>
                    <Messages />
                    <span className="navRight">
                        <span id="cart-icon-items">{cartItems}</span>
                        <Link className="navLink" id="cart-icon" to="/profile" onClick={() => {setCheckCart(true)}}></Link>
                        <Link className="navLink" to="/profile">Profile</Link>
                        <Link className="navLink" id="logout" to="/" onClick={logoutUser}>Logout</Link>
                    </span>
                </span>
                :
                <span>
                    <span className="navLeft">
                        <Link className="navLink" to="/">Home</Link>
                    </span>
                    <Messages />
                    <span className="navRight">
                        <Link className="navLink" to="/signup">Signup</Link>
                        <Link className="navLink" id="login" to="/login">Login</Link>
                    </span>
                </span>
            }
        </nav>
    )
}

export default NavBar;