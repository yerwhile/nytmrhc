import { UserReview } from "./UserReview"

export const UserReviews = ({searchResults}) => {
    
    return <>
    
    <h2>List of Found Reviews</h2>

    <ul className="reviews">
        {
            searchResults.map(
                (review) => <UserReview key={review.id} review={review} />
            )
        }
    </ul>

    </>
}