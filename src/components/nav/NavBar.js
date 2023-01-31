import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">
            <li className="navbar__item navbar__test">
                <Link className="navbar__link" to="nytReviews">Search NYT Reviews</Link>
            </li>
            <li className="navbar__item navbar__test">
                <Link className="navbar__link" to="">Search User Reviews</Link>
            </li>
            <li className="navbar__item navbar__test">
                <Link className="navbar__link" to="">Rage Ranking</Link>
            </li>
            <li className="navbar__item navbar__test">
                <Link className="navbar__link" to="profile">Profile</Link>
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

