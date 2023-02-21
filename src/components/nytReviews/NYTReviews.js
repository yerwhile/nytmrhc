

import { NYTReview } from "./NYTReview"

export const NYTReviews = ({searchResults}) => {

    

    return <>
    <article className="reviews">
        {
            searchResults?.map(
                (review) => <NYTReview key={`${searchResults.indexOf(review)}`} review={review} />
            )
        }
    </article>

    </>
}