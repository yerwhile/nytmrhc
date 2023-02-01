import { useState } from "react"
import { Link } from "react-router-dom"

export const ProfileReviews = ({userReviews}) => {

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
    
    return <div className="profileReviews">
                <h3>Your Reviews</h3>
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
                                    <hr></hr>
                                </div>
                    })
                } 
            </div>
}