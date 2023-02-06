import { useState } from "react"
import { Link } from "react-router-dom"
import "../styles/Reviews.css"

export const UserReview = ({honoredReviews, getAllReviews, review}) => {

    const localHaterUser = localStorage.getItem("hater_user")
    const haterUserObject = JSON.parse(localHaterUser)
    

    const findHonoredReview = (currentReviewId) => {
        const foundHonoredReview = honoredReviews.find((honoredReview) => {
            return honoredReview.reviewId === currentReviewId && honoredReview.userId === haterUserObject.id
        })
        return foundHonoredReview
    }

    const handleHonorButton = (currentReviewId) => {
    
        const sendToHonoredReviews = {
            userId: haterUserObject.id,
            reviewId: currentReviewId
        }
    
        return <button onClick={
            () => {
            return fetch("http://localhost:8088/honoredReviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendToHonoredReviews)
            })
                .then(res => res.json())
                .then(() => {
                    getAllReviews()
                })
            }
        }
        type="submit" className="honorButton">Honor?</button>
    
    
    }

    const handleHonoredButton = (currentReviewId) => {
        return <button onClick={
            () => {
                const honored = findHonoredReview(currentReviewId)
                return fetch(`http://localhost:8088/honoredReviews/${honored.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        getAllReviews()
                    })
            }
        } className="honoredButton">Honored!</button>
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
    const makeHonorsAvailable = () => {
        return undefined === honoredReviews.find(honoredReview => honoredReview.reviewId === review.id && honoredReview.userId === haterUserObject.id)
                            ? handleHonorButton(review.id)
                            : handleHonoredButton(review.id)
    }

    return <section className="review">
                <header>Movie Title: {review.nytTitle}</header>
                <p>Movie Release Date: {review.nytDate}</p>
                <p>NYT Critic: {review.nytReviewer}</p>
                <p>NYTMRHC Reviewer: <Link to={`../profile/${review.userId}`}>{review.user.fullName}</Link></p>
                <Link to={`../profile/${review.userId}/${review.id}`}>See Full Review</Link>
                <div className="review-buttons">
                    {
                        haterUserObject.id === review.userId
                            ? deleteButton(review.id)
                            : ""
                        
                    }
                    {
                        review.userId === haterUserObject.id
                            ? makeHonorsAvailable()
                            : ""
                    }
                </div>
            </section>
}