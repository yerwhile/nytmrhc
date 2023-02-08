

import { NYTReview } from "./NYTReview"

export const NYTReviews = ({searchResults}) => {
    
    return <>
    
    

    <article className="reviews">
        {
            searchResults?.map(
                (review) => <NYTReview key={review.date_updated} review={review} />
            )
        }
    </article>

    </>
}