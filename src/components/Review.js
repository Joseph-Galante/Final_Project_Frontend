const Review = ({ review }) =>
{
    return (
        <div className="review">
            <div className="review-top">
                {review.review ? review.review.writer.name : review.writer.name}
            </div>
            <div className="review-rating">
                Rating: {review.review ? review.review.rating : review.rating}
            </div>
            <div className="review-bottom">
                {review.review ? review.review.description : review.description}
            </div>
        </div>
    )
}

export default Review;