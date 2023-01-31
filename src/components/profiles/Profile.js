import { useEffect, useState } from "react"
import { ProfileHonored } from "./ProfileHonored"
import { ProfileReviews } from "./ProfileReviews"
import { ProfileUser } from "./ProfileUser"

export const Profile = () => {

    const localHaterUser = localStorage.getItem("hater_user")
    const haterUserObject = JSON.parse(localHaterUser)
    const [user, setUser] = useState({})
    const [userReviews, setUserReviews] = useState([])

    useEffect(() => {
        fetch(`http://localhost:8088/users?id=${haterUserObject.id}`)
            .then(res => res.json())
            .then((userArr) => {
                setUser(userArr[0])
            })
    }, [])

    useEffect(() => {
        fetch(`http://localhost:8088/reviews?userId=${haterUserObject.id}`)
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