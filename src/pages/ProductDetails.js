import env from 'react-dotenv'
import { useEffect, useState } from 'react'
import axios from 'axios'

// components
import Review from '../components/Review'

const ProductDetails = (props) =>
{
    // states
    const [product, setProduct] = useState({})
    const [rating, setRating] = useState(0)

    // functions
    const getProduct = () =>
    {
        axios.get(`${env.BACKEND_URL}/products/${props.productId}`).then((res) =>
        {
            console.log(res)
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
                    console.log(res)
                    res += review.review.rating;
                })
                res /= product.reviews.length;
            }
        }
        console.log('final res', res)
        setRating(res)
    }
    useEffect(calcRating, [product.reviews])

    return (
        <div className="productDetails">
            {product ?
                <div>
                    <h1>{product.name}</h1>
                    <h3>Description: {product.description}</h3>
                    <p>Price: {product.price}</p>
                    <p>Rating: {rating}</p>
                    <h2>Reviews:</h2>
                    {product.reviews ? product.reviews.length == 0 ?
                        'No reviews'
                        :
                        product.reviews.map(review =>
                        {
                            return (
                                <Review review={review.review}/>
                            )
                        })
                        : 
                        'Getting reviews...'
                    }
                </div>
                :
                'Getting product...'
            }
        </div>
    )
}

export default ProductDetails;