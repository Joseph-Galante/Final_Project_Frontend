import env from 'react-dotenv'
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router';
import { MessageContext } from '../contexts/MessageContext';
import { UserContext } from '../contexts/UserContext';

// components
import Product from '../components/Product'
import SearchBar from '../components/SearchBar'

const Home = () =>
{
    // contexts
    const { userState, verifyUser } = useContext(UserContext);
    const [user, setUser] = userState;
    const { displayMessage, clearMessage } = useContext(MessageContext);

    // states
    const [shouldRedirect, setShouldRedirect] = useState('');
    const [products, setProducts] = useState([])
    const [filteredProducts, setFilteredProducts] = useState([])
    const [searchTerm, setSearchTerm] = useState('')

    // on component load
    useEffect(clearMessage, []);

    // functions
    const getProducts = () =>
    {
        axios.get(`${env.BACKEND_URL}/products`, { headers: { Authorization: user.id }}).then((res) =>
        {
            // console.log(res)
            setProducts(res.data.products)
        }).catch(error => console.log(error.message))
    }
    useEffect(getProducts, [])

    const filterProducts = () =>
    {
        let filteredProds = []
        if (searchTerm === '')
        {
            filteredProds = products ? products : null;
        }
        else
        {
            filteredProds = products ? products.filter((product) => {
                // console.log(product.name)
                return product.name.toLowerCase().includes(searchTerm)
            }) : null;
        }

        setFilteredProducts(filteredProds);
    }
    useEffect(filterProducts, [searchTerm, products])

    return (
        <div className="home-page">
            {/* {shouldRedirect !== '' ? <Redirect to={shouldRedirect}/> : null} */}
            <SearchBar setSearchTerm={setSearchTerm}/>
            <div className="product-list">
                {filteredProducts ? filteredProducts.length === 0 ? 'No products' : filteredProducts.map(product => { return (
                    <Product key={product.id} product={product} getHomeProducts={getProducts}/>
                )}) : 'Getting products...'}
            </div>
        </div>
    )
}

export default Home;