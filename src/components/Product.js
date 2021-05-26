// imports
import { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios'
import env from 'react-dotenv'

// contexts
import { CartContext } from '../contexts/CartContext'
import { UserContext } from '../contexts/UserContext'
import { MessageContext } from '../contexts/MessageContext';

const Product = ({ product, getProducts, getHomeProducts }) =>
{
    //contexts
    const { cartState, addToCart } = useContext(CartContext);
    const [ cart ] = cartState;
    const { userState, verifyUser } = useContext(UserContext);
    const [ user ] = userState;
    const { displayMessage, clearMessage } = useContext(MessageContext);

    // states
    const [redirect, setRedirect] = useState('')
    const [editingPrice, setEditingPrice] = useState(false)
    const [price, setPrice] = useState(product ? product.price : 0)

    // on component load
    useEffect(clearMessage, [])

    // functions
    const updatePrice = () =>
    {
        axios.put(`${env.BACKEND_URL}/products/${product.id}`, {
            price
        }, { headers: { Authorization: user.id }}).then((res) =>
        {
            // console.log(res)
            if (getProducts)
            {
                getProducts()
            }
            else
            {
                getHomeProducts()
            }
            displayMessage(true, 'Price updated successfully.')
        }).catch(error => console.log(error.message))
    }

    return (
        <div className="single-container">
            {redirect !== '' ? <Redirect to={redirect} /> : null}
            { product !== null ? 
            <div className="product-listing-container" >
                <div className="product-listing-details">
                    <div className="product-listing-left">
                        <img className="product-listing-image" src={product.image} alt={product.name} />
                    </div>
                    <span className="product-listing-divider"/>
                    <div className="product-listing-right">
                        <div className="product-listing-right-info" onClick={() => {setRedirect(`/products/${product.id}`)}}>
                            <span className="product-listing-title">{product.name}</span>
                            <span className="product-listing-description">{product.description}</span>
                        </div>
                        <div className="product-listing-right-price">
                            <span className="product-listing-price">
                                {editingPrice ?
                                    <input type="text" value={price} onChange={(e) => {setPrice(e.target.value)}} />
                                    :
                                    <span>${Math.round(product.price * 100) / 100}</span>
                                }
                            </span>
                            {product.seller ?
                                user.id === product.seller.id ?
                                    editingPrice ?
                                        <div>
                                            <input type="button" value="Cancel" onClick={() => {setEditingPrice(false)}}/>
                                            <input type="button" value="Save" onClick={() => {updatePrice(); setEditingPrice(false)}}/>
                                        </div>
                                        :
                                        <input type="button" value="Edit" onClick={() => {setEditingPrice(true)}}/>
                                    :
                                    null
                                :
                                null
                            }
                        </div>
                    </div>
                    <span className="product-listing-add" onClick={() => {addToCart(product.id)}}>Add to Cart</span>        
                </div>
            </div>
            :
            <div>Loading...</div>
            }
        </div>
    )
}

export default Product;