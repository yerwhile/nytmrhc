import { AdminViews } from "./AdminViews"
import { ReviewerViews } from "./ReviewerViews"



export const ApplicationViews = () => {
	const localPlantUser = localStorage.getItem('plant_user')
    const plantUserObject = JSON.parse(localPlantUser)

    if(plantUserObject.staff) {
        return <ReviewerViews />
    }
    else {
        return <AdminViews />
    }
}

