import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProfileHonored } from "./ProfileHonored"
import { ProfileReviews } from "./ProfileReviews"
import { ProfileUser } from "./ProfileUser"
import "../styles/Profile.css"

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
        <div className="profile-left">
            <div className="profile-box">
                <ProfileUser user={user} />
            </div>
            <div className="profile-box">
                <h3>Honored Reviews</h3>
                <ProfileHonored 
                    honoredReviews={honoredReviews} 
                    userReviews={userReviews} 
                    getAllReviews={getAllReviews}/>
            </div>
            
        </div>
        <div className="profile-right">
            <div className="profile-box">
                <ProfileReviews 
                    getAllHonoredReviews={getAllHonoredReviews} 
                    getAllReviews={getAllReviews} 
                    honoredReviews ={honoredReviews} 
                    userReviews={userReviews} />
            </div>
        </div>
    </div>    
    )
}