import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProfileHonored } from "./ProfileHonored"
import { ProfileReviews } from "./ProfileReviews"
import { ProfileUser } from "./ProfileUser"

export const Profile = () => {

    const { userId } = useParams({})

    const [user, setUser] = useState({})
    const [userReviews, setUserReviews] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/users?id=${userId}`)
            .then(res => res.json())
            .then((userArr) => {
                setUser(userArr[0])
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/reviews?userId=${userId}&_sort=nytTitle`)
            .then(res => res.json())
            .then((reviewArr) => {
                setUserReviews(reviewArr)
            })
    }, [])

    return (
    <div className="profile">
       <ProfileUser user={user} />
       <ProfileReviews userReviews={userReviews} />
       <ProfileHonored />
    </div>    
    )
}