import { UserReview } from "./UserReview"

export const UserReviews = ({honoredReviews, getAllReviews, searchResults}) => {
    
    return <>

    <ul className="reviews">
        {
            searchResults.map(
                (review) => <UserReview key={review.id} review={review} getAllReviews={getAllReviews} honoredReviews={honoredReviews} />
            )
        }
    </ul>

    </>
}