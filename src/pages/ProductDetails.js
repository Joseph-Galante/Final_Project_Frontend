import env from 'react-dotenv'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

// contexts
import { CartContext } from '../contexts/CartContext'

// components
import Review from '../components/Review'

const ProductDetails = (props) =>
{
    // contexts    
    const { cartState, addToCart } = useContext(CartContext);
    const [ cart ] = cartState;

    // states
    const [product, setProduct] = useState({})
    const [rating, setRating] = useState(0)

    // functions
    const getProduct = () =>
    {
        axios.get(`${env.BACKEND_URL}/products/${props.productId}`).then((res) =>
        {
            // console.log(res)
            setProduct(res.data.product)
        })
    }
    useEffect(getProduct, [])

    const calcRating = () =>
    {
        let res = 0;

        if (product.reviews)
        {
            if (product.reviews.length > 0)
            {
                product.reviews.forEach(review => {
                    // console.log(res)
                    res += review.review.rating;
                })
                res /= product.reviews.length;
            }
        }
        // console.log('final res', res)
        setRating(res)
    }
    useEffect(calcRating, [product.reviews])

    return (
        <div className="product-details">
            {product ?
                <div>
                    <h1>{product.name}</h1>
                    <h3>Description: {product.description}</h3>
                    <p>Price: ${product.price}</p>
                    <p>Rating: {rating}</p>

                    <span className="product-details-listing-add" onClick={() => {addToCart(product.id)}}>Add to Cart</span> 

                    <h2>Reviews:</h2>
                    {product.reviews ? product.reviews.length == 0 ?
                        'No reviews'
                        :
                        product.reviews.map(review =>
                        {
                            return (
                                <Review key={review.review.id} review={review.review}/>
                            )
                        })
                        : 
                        'Getting reviews...'
                    }
                </div>
                :
                'Getting product details...'
            }
        </div>
    )
}

export default ProductDetails;