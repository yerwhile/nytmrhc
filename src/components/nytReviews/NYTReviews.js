

import { NYTReview } from "./NYTReview"

export const NYTReviews = ({searchResults}) => {
    
    return <>
    
    <h2>List of Found Reviews</h2>

    <ul className="reviews">
        {
            searchResults?.map(
                (review) => <NYTReview key={review.date_updated} review={review} />
            )
        }
    </ul>

    </>
}