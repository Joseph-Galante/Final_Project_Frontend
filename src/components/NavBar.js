// link
import { Link } from 'react-router-dom'

// contexts
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext';

// components
import Messages from '../components/Messages'


const NavBar = () =>
{
    // states
    const { userState } = useContext(UserContext);
    const [user, setUser] = userState;
    const { cartState, checkCartState } = useContext(CartContext);
    const [ cart ] = cartState;
    const [ checkCart, setCheckCart ] = checkCartState;

    // functions
    const logoutUser = () =>
    {
        localStorage.removeItem('userId');
        setUser({});
    }

    return (
        <nav>
            {user.id ?
                <span>
                    <span className="navLeft">
                        <Link className="navLink" to="/">Home</Link>
                    </span>
                    <Messages />
                    <span className="navRight">
                        <span id="cart-icon-items">{cart ? cart.length : 0}</span>
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