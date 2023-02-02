import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProfileHonored } from "./ProfileHonored"
import { ProfileReviews } from "./ProfileReviews"
import { ProfileUser } from "./ProfileUser"

export const Profile = () => {

    const { userId } = useParams({})

    const [reviews, setReviews] = useState([])
    const [user, setUser] = useState({})
    const [userReviews, setUserReviews] = useState([])
    const [honoredReviews, setHonoredReviews] = useState([])

    const getAllReviews = () => {
        return fetch(`http://localhost:8088/reviews`)
            .then(res => res.json())
            .then((reviewsArr) => {
                setReviews(reviewsArr)
            })
    }

    const getAllHonoredReviews = () => {
        return fetch(`http://localhost:8088/honoredReviews`)
        .then(res => res.json())
        .then((honoredArr) => {
            setHonoredReviews(honoredArr)
        })
    }

    useEffect(() => {
        getAllReviews()
    }, [])

    useEffect(() => {
        getAllHonoredReviews()
    }, [reviews])

    useEffect(() => {
        fetch(`http://localhost:8088/users?id=${userId}`)
            .then(res => res.json())
            .then((userArr) => {
                setUser(userArr[0])
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/reviews?userId=${userId}&_sort=nytTitle&_expand=user`)
            .then(res => res.json())
            .then((reviewArr) => {
                setUserReviews(reviewArr)
            })
    }, [reviews])

    return (
    <div className="profile">
       <ProfileUser user={user} />
       <ProfileReviews getAllHonoredReviews={getAllHonoredReviews} getAllReviews={getAllReviews} honoredReviews ={honoredReviews} userReviews={userReviews} />
       <ProfileHonored />
    </div>    
    )
}