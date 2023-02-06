import { useEffect, useState } from "react"
import { RageReviews } from "./RageReviews"
import "../styles/Rage.css"

export const Rage = () => {
    const [rageReviews, setRageReviews] = useState([])
    const [honoredReviews, setHonoredReviews] = useState([])
    const [rageObjects, setRageObjects] = useState([])

    const getAllRageReviews = () => {
        return fetch(`http://localhost:8088/reviews?_sort=rage&_expand=user&_order=desc`)
            .then(res => res.json())
            .then((reviewsArr) => {
                setRageReviews(reviewsArr)
            })
    }

    const getAllHonoredReviews = () => {
        return fetch(`http://localhost:8088/honoredReviews`)
        .then(res => res.json())
        .then((honoredArr) => {
            setHonoredReviews(honoredArr)
        })
    }

    const getAllRageObjects = () => {
        return fetch(`http://localhost:8088/rageObjects`)
        .then(res => res.json())
        .then((rageObjectArr) => {
            setRageObjects(rageObjectArr)
        })
    }

    useEffect(() => {
        getAllRageReviews()
    }, [])

    useEffect(() => {
        getAllHonoredReviews()
    }, [rageReviews])

    useEffect(() => {
        getAllRageObjects()
    }, [rageReviews])

    

    return <div className="rageReviews">
    <h3>Rage Ranking: Most Enraged User Reviews</h3>
    <RageReviews rageReviews={rageReviews} 
        getAllRageReviews={getAllRageReviews} 
        honoredReviews={honoredReviews}
        rageObjects={rageObjects} />
    </div>
}