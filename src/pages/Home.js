import env from 'react-dotenv'
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router';
import { MessageContext } from '../contexts/MessageContext';
import { UserContext } from '../contexts/UserContext';

const Home = () =>
{
    // contexts
    const { userState, verifyUser } = useContext(UserContext);
    const [user, setUser] = userState;
    const { displayMessage, clearMessage } = useContext(MessageContext);

    // states
    const [shouldRedirect, setShouldRedirect] = useState('');
    const [products, setProducts] = useState([])

    // on component load
    useEffect(clearMessage, []);
    useEffect(getProducts, [])

    // functions
    const getProducts = () =>
    {
        axios.get(`${env.BACKEND_URL}/products`, { headers: { Authorization: user.id }}).then((res) =>
        {
            console.log(res)
            setProducts(res.data.products)
        }).catch(error => console.log(error.message))
    }

    return (
        <div className="homePage">
            {/* {shouldRedirect !== '' ? <Redirect to={shouldRedirect}/> : null} */}
            <h1>Products</h1>
            {products ? products.length === 0 ? 'No products' : products : 'Getting products...'}
        </div>
    )
}

export default Home;