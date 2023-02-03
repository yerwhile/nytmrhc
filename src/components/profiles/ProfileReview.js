import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "../styles/Reviews.css"

export const ProfileReview = () => {
    const { reviewId } = useParams({})
    const [review, updateReview] = useState({})
 
  
 
    useEffect(() => {
        fetch(`http://localhost:8088/reviews?id=${reviewId}&_expand=user`)
            .then(res => res.json())
            .then((reviewArr) => {
                const singleReview = reviewArr[0]
                updateReview(singleReview)
            })
    }, [reviewId])

    

    return <section className='reviewFull' >
            <header className='reviewFull__header'>{review?.user?.fullName}'s review of:</header>
            <div>NYT Critic: {review?.nytReviewer}</div>
            <div>Film Title: {review?.nytTitle}</div>
            <img src={review?.userImage} height="200"/>
            <div>Your Review: {review?.userReview}</div>
        </section>

}