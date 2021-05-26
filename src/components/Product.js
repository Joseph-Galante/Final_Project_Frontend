import { useContext, useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { CartContext } from '../contexts/CartContext'

const Product = ({ product }) =>
{
    //contexts
    const { cartState, addToCart } = useContext(CartContext);
    const [ cart ] = cartState;

    // states
    const [redirect, setRedirect] = useState('')

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
                    <div className="product-listing-right" onClick={() => {setRedirect(`/products/${product.id}`)}}>
                        <div className="product-listing-right-info">
                            <span className="product-listing-title">{product.name}</span>
                            <span className="product-listing-description">{product.description}</span>
                        </div>
                        <span className="product-listing-price">${product.price}</span>
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