export const NYTReview = ({review}) => {
    return <li className="review">
                        <header>{review.display_title}</header>
                        <p>Rated: {review.mpaa_rating}</p>
                        <p>Reviewer: {review.byline}</p>
                        <p>Review Title: {review.headline}</p>
                    </li>
}