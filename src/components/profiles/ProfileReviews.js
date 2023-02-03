import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"

export const ProfileReviews = ({getAllHonoredReviews, getAllReviews, honoredReviews, userReviews}) => {

    const localHaterUser = localStorage.getItem("hater_user")
    const haterUserObject = JSON.parse(localHaterUser)
    const navigate = useNavigate()
    
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

    const makeHonorsAvailable = (userReviewId) => {
        return undefined === honoredReviews.find(honoredReview => honoredReview.reviewId === userReviewId)
                    ? handleHonorButton(userReviewId)
                    : handleHonoredButton(userReviewId)
    }

    return <div className="profileReviews">
                <h3>Reviews</h3>
                {
                    userReviews.map((userReview) => {
                        return <div className="review" key={userReview.id}>
                                    <p>NYT Critic: {userReview.nytReviewer}</p>
                                    <p>Film Title: {userReview.nytTitle}</p>
                                    <Link to={`./${userReview.id}`}>See Full Review</Link>
                                    <div className="review-buttons">
                                        {
                                            haterUserObject.id === userReview.userId
                                                ? deleteButton(userReview.id)
                                                : ""
                                            
                                        }
                                        {
                                            userReview.userId === haterUserObject.id
                                                ? makeHonorsAvailable(userReview.id)
                                                : ""
                                        }
                                    </div>
                                </div>
                    })
                } 
            </div>
}