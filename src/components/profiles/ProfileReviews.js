import { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"

export const ProfileReviews = ({getAllHonoredReviews, getAllReviews, honoredReviews, userReviews}) => {

    const localHaterUser = localStorage.getItem("hater_user")
    const haterUserObject = JSON.parse(localHaterUser)
    const navigate = useNavigate()
    
    const[reviews, setReviews] = useState([])
    
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
        type="submit" className="btn">Honor?</button>
    
    
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
        } className="honored__delete">Honored!</button>
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
    
    return <div className="profileReviews">
                <h3>{`${userReviews[0]?.user?.fullName}'s Reviews`}</h3>
                {
                    userReviews.map((userReview) => {
                        return <div className="userReview" key={userReview.id}>
                                    <p>NYT Critic: {userReview.nytReviewer}</p>
                                    <p>Film Title: {userReview.nytTitle}</p>
                                    <Link to={`./${userReview.id}`}>See Full Review</Link>
                                    {
                                        haterUserObject.id === userReview.userId
                                            ? deleteButton(userReview.id)
                                            : ""
                                        
                                    }
                                    {
                                        undefined === honoredReviews.find(honoredReview => honoredReview.reviewId === userReview.id)
                                            ? handleHonorButton(userReview.id)
                                            : handleHonoredButton(userReview.id)
                                    }
                                    <hr></hr>
                                </div>
                    })
                } 
            </div>
}