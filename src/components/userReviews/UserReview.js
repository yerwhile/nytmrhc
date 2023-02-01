import { useState } from "react"
import { Link } from "react-router-dom"

export const UserReview = ({review}) => {

    const localHaterUser = localStorage.getItem("hater_user")
    const haterUserObject = JSON.parse(localHaterUser)
    
    const[reviews, setReviews] = useState([])

    const getAllReviews = () => {
        return fetch(`http://localhost:8088/reviews`)
            .then(res => res.json())
            .then((reviewsArr) => {
                setReviews(reviewsArr)
            })
    }
    
    const deleteButton = (reviewId) => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/reviews/${reviewId}`, {
                method: "DELETE"
            })
                .then(() => {
                    getAllReviews()
                })
        }} className="review__delete">Delete</button>
}

    return <li className="review">
                <header>{review.nytTitle}</header>
                <p>NYT Critic: {review.nytReviewer}</p>
                <p>Movie Release Date: {review.nytDate}</p>
                <p>NYTMRHC Reviewer: {review.user.fullName}</p>
                <Link to={`../profile/${review.id}`}>See Full Review</Link>
                {
                    haterUserObject.id === review.userId
                        ? deleteButton(review.id)
                        : ""
                    
                }
            </li>
}