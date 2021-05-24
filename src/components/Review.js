const Review = ({ review }) =>
{
    return (
        <div className="review">
            {review.writer.name} | {review.description} | {review.rating}
        </div>
    )
}

export default Review;