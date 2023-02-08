import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = ({users}) => {
    const localHaterUser = localStorage.getItem("hater_user")
    const haterUserObject = JSON.parse(localHaterUser)

    const navigate = useNavigate()

    const currentUser = users.find((user) => {
        return user.id === haterUserObject.id
    })

    return (
        <ul className="navbar">
            <li className="navbar__item navbar__test">
                <Link className="navbar__link" to="nytReviews">Search <i>NYT</i> Reviews</Link>
            </li>
            <li className="navbar__item navbar__test">
                <Link className="navbar__link" to="userReviews">Search User Reviews</Link>
            </li>
            <li className="navbar__item navbar__test">
                <Link className="navbar__link" to="rage">Rage Ranking</Link>
            </li>
            <li className="navbar__item navbar__test">
                <Link className="navbar__link" to={`profile/${haterUserObject.id}`}>Profile</Link> <br></br>
                <Link className="navbar__link" to={`../edit/${haterUserObject.id}`}>(Edit)</Link>
            </li>
            <li className="navbar__item navbar__logout">
                {currentUser?.fullName} <br></br>
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("hater_user")
                    navigate("/", {replace: true})
                }}>(Logout)</Link>
            </li>
        </ul>
    )
}

