import { AdminNav } from "./AdminNav"
import "./NavBar.css"
import { ReviewerNav } from "./ReviewerNav"

export const NavBar = () => {
    const localHaterUser = localStorage.getItem('hater_user')
    const haterUserObject = JSON.parse(localHaterUser)

    if(haterUserObject.isAdmin) {
        return <AdminNav />
    }
    else {
        return <ReviewerNav />
    }
}

