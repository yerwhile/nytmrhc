import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const ProfileHonored = ({getAllReviews, honoredReviews, userReviews}) => {

    const localHaterUser = localStorage.getItem("hater_user")
    const haterUserObject = JSON.parse(localHaterUser)

    const findHonoredReview = (currentReviewId) => {
        const foundHonoredReview = honoredReviews.find((honoredReview) => {
            return honoredReview.reviewId === currentReviewId && honoredReview.userId === haterUserObject.id
        })
        return foundHonoredReview
    }

    const findUserHonoredReviews = () => {
        const honoredArr = []
        for(const honored of honoredReviews) {
            for(const userReview of userReviews) {
                if(honored.reviewId === userReview.id)
                honoredArr.push(userReview)
            }
        }
        return honoredArr
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

    const makeHonorsAvailable = (honoredReviewId) => {
        return handleHonoredButton(honoredReviewId)
    }

    return <>
                
                {
                    (findUserHonoredReviews()).map((honoredReview) => {
                        return <div className="review" key={honoredReview.id}>
                                    <p>NYT Critic: {honoredReview.nytReviewer}</p>
                                    <p>Film Title: {honoredReview.nytTitle}</p>
                                    <Link to={`./${honoredReview.id}`}>See Full Review</Link>
                                    <div className="review-buttons">
                                        {
                                            haterUserObject.id === honoredReview.userId
                                                ? deleteButton(honoredReview.id)
                                                : ""
                                            
                                        }
                                        {
                                            honoredReview.userId === haterUserObject.id
                                                ? makeHonorsAvailable(honoredReview.id)
                                                : ""
                                        }
                                    </div>
                                </div>
                    })
                } 
            </>
}