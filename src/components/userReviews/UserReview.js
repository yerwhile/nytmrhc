import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "../styles/Reviews.css"

export const UserReview = ({rageObjects, honoredReviews, getAllReviews, review}) => {

    const localHaterUser = localStorage.getItem("hater_user")
    const haterUserObject = JSON.parse(localHaterUser)
    
    const navigate = useNavigate()

    const findHonoredReview = (currentReviewId) => {
        const foundHonoredReview = honoredReviews.find((honoredReview) => {
            return honoredReview.reviewId === currentReviewId && honoredReview.userId === haterUserObject.id
        })
        return foundHonoredReview
    }

    const handleRageButton = (reviewId, currentRage) => {
        const updateRage = {
            rage: currentRage + 1,
            enraged: true
        }

        const createRageObject = {
            userId: haterUserObject.id,
            reviewId: reviewId
        }
        
        return <button onClick={
            () => {
            return fetch(`http://localhost:8088/reviews/${reviewId}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updateRage)
                    })
                    .then(res => res.json())
                    .then(() => {
                        return fetch (`http://localhost:8088/rageObjects`, {
                            method: "POST",
                            headers: {
                            "Content-Type": "application/json"
                            },
                            body: JSON.stringify(createRageObject)
                        })
                        .then(res => res.json())
                        .then(() => {
                            getAllReviews()
                        })
                        
                    })
            }
        }
        type="submit" className="rageButton">Rage?</button>
    }

    const handleEnragedButton = (reviewId, currentRage) => {
        const updateRage = {
            rage: currentRage - 1,
            enraged: false
        }
        
        return <button onClick={
            () => {
            return fetch(`http://localhost:8088/reviews/${reviewId}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updateRage)
                    })
                    .then(res => res.json())
                    .then(() => {
                        const foundRageObject = rageObjects.find((rageObject) => {
                            return rageObject.reviewId === reviewId && rageObject.userId === haterUserObject.id
                        })
                        return fetch (`http://localhost:8088/rageObjects/${foundRageObject.id}`, {
                            method: "DELETE",
                        })
                        .then(() => {
                            getAllReviews()
                        })
                    })
            }
        }
        type="submit" className="enragedButton">Enraged!</button>
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

    const editButton = (reviewId) => {
        return <button onClick={() => {
            navigate(`../edit/${haterUserObject.id}/${reviewId}`)
        }} className="review__edit">Edit</button>
    }

    const makeHonorsAvailable = () => {
        return undefined === honoredReviews.find(honoredReview => honoredReview.reviewId === review.id && honoredReview.userId === haterUserObject.id)
                            ? handleHonorButton(review.id)
                            : handleHonoredButton(review.id)
    }

    const makeRageAvailable = (userReview, currentRage) => {
        const foundRageObject = rageObjects.find((rageObject) => {
            return rageObject.reviewId === userReview.id && rageObject.userId === haterUserObject.id
        })
        return undefined === foundRageObject
            ? handleRageButton(userReview.id, currentRage)
            : handleEnragedButton(userReview.id, currentRage)
    }

    return <section className="review">
                <header>Movie Title: {review.nytTitle}</header>
                <p>Movie Release Date: {review.nytDate}</p>
                <p>NYT Critic: {review.nytReviewer}</p>
                <p>NYTMRHC Reviewer: <Link to={`../profile/${review.userId}`}>{review.user.fullName}</Link></p>
                <p>Rage Count: {review.rage}</p>
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
                    {
                        review.userId !== haterUserObject.id
                            ? makeRageAvailable(review, review.rage)
                            : ""
                    }
                    {
                        review.userId === haterUserObject.id
                            ? editButton(review.id)
                            : ""
                    }
                </div>
            </section>
}