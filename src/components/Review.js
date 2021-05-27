const Review = ({ review }) =>
{
    return (
        <div className="review">
            <div className="review-top">
                {review.writer.name}
            </div>
            <div className="review-rating">
                Rating: {review.rating}
            </div>
            <div className="review-bottom">
                {review.description}
            </div>
        </div>
    )
}

export default Review;