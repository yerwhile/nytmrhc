import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"

export const ProfileReviews = ({rageObjects, getAllReviews, honoredReviews, userReviews}) => {

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

    const makeHonorsAvailable = (userReviewId) => {
        return undefined === honoredReviews.find(honoredReview => honoredReview.reviewId === userReviewId)
                    ? handleHonorButton(userReviewId)
                    : handleHonoredButton(userReviewId)
    }

    const makeRageAvailable = (userReview, currentRage) => {
        const foundRageObject = rageObjects.find((rageObject) => {
            return rageObject.reviewId === userReview.id && rageObject.userId === haterUserObject.id
        })
        return undefined === foundRageObject
            ? handleRageButton(userReview.id, currentRage)
            : handleEnragedButton(userReview.id, currentRage)
    }


    return <div className="profileReviews">
                <h3>Reviews</h3>
                {
                    userReviews.map((userReview) => {
                        return <div className="review" key={userReview.id}>
                                    <p><i>NYT</i> Critic: {userReview.nytReviewer}</p>
                                    <p>Film Title: <i>{userReview.nytTitle}</i></p>
                                    <p>Rage Count: {userReview.rage}</p>
                                    <Link className="reviewLink" to={`./${userReview.id}`}>See Full Review</Link>
                                    <div className="review-buttons">
                                        {
                                            haterUserObject.id === userReview.userId
                                                ? deleteButton(userReview.id)
                                                : ""
                                            
                                        }
                                        {
                                            userReview.userId === haterUserObject.id
                                                ? editButton(userReview.id)
                                                : ""
                                        }
                                        {
                                            userReview.userId === haterUserObject.id
                                                ? makeHonorsAvailable(userReview.id)
                                                : ""
                                        }
                                        {
                                            userReview.userId !== haterUserObject.id
                                                ? makeRageAvailable(userReview, userReview.rage)
                                                : ""
                                        }
                                    </div>
                                </div>
                    })
                } 
            </div>
}