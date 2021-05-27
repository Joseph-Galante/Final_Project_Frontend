import env from 'react-dotenv'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

// contexts
import { CartContext } from '../contexts/CartContext'

// components
import Review from '../components/Review'
import { UserContext } from '../contexts/UserContext'
import { MessageContext } from '../contexts/MessageContext'
import { Redirect, useHistory } from 'react-router-dom'

const ProductDetails = (props) =>
{
    // variables
    const history = useHistory();

    // contexts
    const { userState, verifyUser } = useContext(UserContext);
    const [ user ] = userState;
    const { cartState, addToCart } = useContext(CartContext);
    const [ cart ] = cartState;
    const { displayMessage, clearMessage } = useContext(MessageContext);

    // states
    const [redirect, setRedirect] = useState('')
    const [product, setProduct] = useState({})
    const [rating, setRating] = useState(0)
    const [display, setDisplay] = useState('description');
    const [reviewDescription, setReviewDescription] = useState('');
    const [reviewRating, setReviewRating] = useState(3);

    // on component load
    useEffect(clearMessage, [])

    // functions
    const updateMenu = (tab) =>
    {
        setReviewDescription('')
        setReviewRating(3)
        setDisplay(tab)
        document.querySelectorAll('.menu-item').forEach(item => {item.classList.remove('active')});
        document.querySelector(`#${tab}`).classList.add('active')
    }
    useEffect(() => {updateMenu('description')}, [])

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
        setRating(Math.round(res * 10) / 10)
    }
    useEffect(calcRating, [product.reviews])

    const writeReview = (e) =>
    {
        e.preventDefault()
        if (reviewDescription === '')
        {
            displayMessage(false, 'You must provide a description for your review.')
            return
        }
        axios.post(`${env.BACKEND_URL}/reviews/products/${product.id}`, {
            description: reviewDescription,
            rating: reviewRating
        }, { headers: { Authorization: user.id}}).then((res) =>
        {
            getProduct()
            updateMenu('reviews')
            displayMessage(true, 'Review posted')
        }).catch(error => console.log(error.message))
    }

    return (
        <div className="product-details-page">
            {redirect !== '' ? <Redirect to={redirect} /> : null}
            {product ?
                <div className="about-product">
                    {/* {console.log(product)} */}
                    <div className="product-info">
                        <div className="product-info-left">
                            <img src={product.image} alt={product.name} width={525} height={350}/>
                        </div>
                        <div className="product-info-right">
                            <h1>{product.name}</h1>
                            <p>Price: ${product.price}</p>
                            <p>Rating: {rating}</p>
                            <p id="soldBy" onClick={() => {
                                localStorage.setItem('revieweeId', product.seller.id);
                                history.push(`/products/${product.id}`);
                                setRedirect(`/reviews/users`);
                            }}
                            >Sold by: {product.seller ? product.seller.name : '(Unknown)'}</p>

                            <span className="product-details-listing-add" onClick={() => {addToCart(product.id)}}>Add to Cart</span> 
                        </div>
                    </div>

                    <div className="product-details-menu">
                        <div id="description" key="description" className="menu-item" onClick={() => {
                            clearMessage();
                            updateMenu('description')
                        }}>
                            <h4>Description</h4>
                        </div>
                        <div id="reviews" key="reviews" className="menu-item" onClick={() => {
                            
                            clearMessage();
                            updateMenu('reviews')
                        }}>
                            <h4>Reviews ({product.reviews ? product.reviews.length : 0})</h4>
                        </div>
                        <div id="leave-review" key="leave-review" className="menu-item" onClick={() => {
                            clearMessage();
                            updateMenu('leave-review')
                        }}>
                            <h4>Leave Review</h4>
                        </div>
                    </div>
                    <div className="product-details-display">
                        {display == 'description' ?
                            <div>{product.description}</div>
                            :
                            display == 'reviews' ?
                                product.reviews ? 
                                    product.reviews.length == 0 ?
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
                                :
                                display == 'leave-review' ?
                                        <form className="review-form" onSubmit={(e) => {writeReview(e)}}>
                                            <h1>Leave a Review</h1>
                                            <input id="review-description-input" type="text" value={reviewDescription} placeholder="Write a review..." onChange={(e) => {setReviewDescription(e.target.value)}} />
                                            <input id="review-rating-input" type="number" value={reviewRating} min={1} max={5} onChange={(e) => {setReviewRating(e.target.value)}} />
                                            <br/>
                                            <input style={{margin: "20px"}}type="submit" value="Submit" />
                                        </form>
                                        :
                                        null
                        }
                    </div>
                </div>
                :
                'Getting product details...'
            }
        </div>
    )
}

export default ProductDetails;