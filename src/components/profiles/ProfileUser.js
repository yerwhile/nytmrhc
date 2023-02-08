import { useEffect, useState } from "react"

export const ProfileUser = ({user}) => {

    return <div className="profileInfo">
                <h3>{user.fullName}'s Profile</h3>
                <img src={user.image} />
                <p>{user.about}</p>
            </div>
}