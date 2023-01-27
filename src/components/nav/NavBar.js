import { AdminNav } from "./AdminNav"
import "./NavBar.css"
import { ReviewerNav } from "./ReviewerNav"

export const NavBar = () => {
    const localPlantUser = localStorage.getItem('plant_user')
    const plantUserObject = JSON.parse(localPlantUser)

    if(plantUserObject.isAdmin) {
        return <AdminNav />
    }
    else {
        return <ReviewerNav />
    }
}

