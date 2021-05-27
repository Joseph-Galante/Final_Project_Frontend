// imports
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import env from 'react-dotenv'
import { useHistory } from 'react-router-dom'

// contexts
import { MessageContext } from '../contexts/MessageContext';
import { UserContext } from '../contexts/UserContext';

const UserReview = () =>
{
    // variables
    const history = useHistory();

    // contexts
    const {userState, verifyUser } = useContext(UserContext);
    const [user, setUser] = userState;
    const { displayMessage, clearMessage } = useContext(MessageContext);

    // states
    const [reviewDescription, setReviewDescription] = useState('');
    const [reviewRating, setReviewRating] = useState(3);
    const [complete, setComplete] = useState(false)

    // on component load
    useEffect(clearMessage, [])

    // functions
    const writeReview = (e) =>
    {
        e.preventDefault()
        if (reviewDescription === '')
        {
            displayMessage(false, 'You must provide a description for your review.')
            return
        }
        axios.post(`${env.BACKEND_URL}/reviews/users/${localStorage.getItem('revieweeId')}`, {
            description: reviewDescription,
            rating: reviewRating
        }, { headers: { Authorization: user.id}}).then((res) =>
        {
            displayMessage(true, 'Your review has been submitted. Click the link below to be redirected to the previous page.')
            setComplete(true)
        }).catch(error => console.log(error.message))
    }

    return (
        <div className="user-review-page">
            <h1>Review a User</h1>
            {complete ?
                <p id="done-reviewing" onClick={() => {history.goBack()}}>Go Back</p>
                :
                <div>
                    <form className="user-review-form" onSubmit={(e) => {writeReview(e)}}>
                        <input id="review-description-input" type="text" value={reviewDescription} placeholder="Write a review..." onChange={(e) => {setReviewDescription(e.target.value)}} />
                        <input id="review-rating-input" type="number" value={reviewRating} min={1} max={5} onChange={(e) => {setReviewRating(e.target.value)}} />
                        <br/>
                        <input style={{margin: "20px"}} type="submit" value="Submit" />
                    </form>
                    <p id="done-reviewing" onClick={() => {history.goBack()}}>Go Back</p>
                </div>
            }
        </div>
    )
}

export default UserReview;