import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import "../styles/Reviews.css"

export const ProfileReview = () => {
    const { reviewId } = useParams({})
    const [review, updateReview] = useState({})
 
    const localHaterUser = localStorage.getItem("hater_user")
    const haterUserObject = JSON.parse(localHaterUser)
    const navigate = useNavigate()
  
 
    useEffect(() => {
        fetch(`http://localhost:8088/reviews?id=${reviewId}&_expand=user`)
            .then(res => res.json())
            .then((reviewArr) => {
                const singleReview = reviewArr[0]
                updateReview(singleReview)
            })
    }, [reviewId])

    const editButton = (reviewId) => {
        return <button onClick={() => {
            navigate(`../edit/${haterUserObject.id}/${reviewId}`)
        }} className="review__edit">Edit</button>
    }

    return <section className='reviewFull' >
            <h3 className='reviewFull__header'>
                <Link to={`../profile/${review.userId}`}>{review?.user?.fullName}</Link>
                's Review of {review?.nytReviewer}'s Review of <i>{review?.nytTitle}</i></h3>
            <div className='reviewFull__body'>
                <img src={review?.userImage} />
                <p>{review?.userReview}</p>
                <div className="review-buttons">
                    {
                        review.userId === haterUserObject.id
                            ? editButton(review.id)
                            : ""
                    }
                </div>
            </div>
        </section>

}