import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./NYTReview.css"

export const NYTReview = ({review}) => {
    
    const navigate = useNavigate()
    const localHaterUser = localStorage.getItem("hater_user")
    const haterUserObject = JSON.parse(localHaterUser)


    const postReviewButton = () => {
        
        const sendToReviews = {
            nytTitle: review.display_title,
            nytReviewer: review.byline,
            nytDate: review.opening_date,
            nytRating: review.mpaa_rating,
            nytReviewURL: review.link.url,
            userId: haterUserObject.id,
            userImage: "",
            userReview: ""
        }

        return <button onClick={
            () => {
            return fetch("http://localhost:8088/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendToReviews)
            })
                .then(res => res.json())
                .then(() => {
                    return fetch(`http://localhost:8088/reviews?userId=${haterUserObject.id}&nytTitle=${review.display_title}`)
                        .then(res => res.json())
                        .then((reviewArr) => {
                            navigate(`${reviewArr[0].id}/${haterUserObject.id}/create`)
                        })
                })
            }
        }
        type="submit" className="btn">Post a Review</button>


    }

    return <li className="review">
                        <header>{review.display_title}</header>
                        <p>Rated: {review.mpaa_rating}</p>
                        <p>Movie Release Date: {review.opening_date}</p>
                        <p>Reviewer: {review.byline}</p>
                        {
                            postReviewButton()
                        }
                    </li>
}