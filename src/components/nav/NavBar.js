import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const localHaterUser = localStorage.getItem("hater_user")
    const haterUserObject = JSON.parse(localHaterUser)

    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item navbar__test">
                <Link className="navbar__link" to="nytReviews">Search NYT Reviews</Link>
            </li>
            <li className="navbar__item navbar__test">
                <Link className="navbar__link" to="userReviews">Search User Reviews</Link>
            </li>
            {/* <li className="navbar__item navbar__test">
                <Link className="navbar__link" to="" invisible>Rage Ranking</Link>
            </li> */}
            <li className="navbar__item navbar__test">
                <Link className="navbar__link" to={`profile/${haterUserObject.id}`}>Profile</Link>
            </li>
            <li className="navbar__item navbar__logout">
                <Link className="navbar__link" to="" onClick={() => {
                    localStorage.removeItem("hater_user")
                    navigate("/", {replace: true})
                }}>Logout</Link>
            </li>
        </ul>
    )
}

