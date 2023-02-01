import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const ProfileReview = () => {
    const { reviewId } = useParams({})
    const [review, updateReview] = useState({})
  
 
    useEffect(() => {
        fetch(`http://localhost:8088/reviews?id=${reviewId}`)
            .then(res => res.json())
            .then((data) => {
                const singleReview = data[0]
                updateReview(singleReview)
            })
    }, [reviewId])

    return <section className='reviewFull' >
            <header className='reviewFull__header'>{review?.nytTitle}</header>
            <img src={review?.userImage} height="200"/>
            <div>NYT Critic: {review?.nytReviewer}</div>
            <div>Your Review: {review?.userReview}</div>
        </section>

}