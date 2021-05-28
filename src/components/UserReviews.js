// imports
import axios from 'axios';
import env from 'react-dotenv'
import { useContext, useEffect, useState } from 'react';

// components
import Review from '../components/Review'

// contexts
import { UserContext } from '../contexts/UserContext';

const UserReviews = () =>
{
    // contexts
    const { userState } = useContext(UserContext)
    const [ user ] = userState;

    // states
    const [reviews, setReviews] = useState([]);

    // functions
    const getReviews = () =>
    {
        axios.get(`${env.BACKEND_URL}/users/reviews`, { headers: { Authorization: user.id }}).then((res) =>
        {
            // console.log(res)
            setReviews(res.data.reviews);
        }).catch(error => console.log(error.message))
    }
    useEffect(getReviews, [])

    return (
        <div className="user-reviews">
            {reviews ?
                reviews.length === 0 ?
                    'No reviews'
                    :
                    reviews.map(review =>
                    {
                        return <Review key={review.id} review={review} />
                    })
                :
                'Getting reviews...'
            }
        </div>
    )
}

export default UserReviews