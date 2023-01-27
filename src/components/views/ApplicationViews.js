import { AdminViews } from "./AdminViews"
import { ReviewerViews } from "./ReviewerViews"



export const ApplicationViews = () => {
	const localHaterUser = localStorage.getItem('hater_user')
    const haterUserObject = JSON.parse(localHaterUser)

    if(haterUserObject.staff) {
        return <ReviewerViews />
    }
    else {
        return <AdminViews />
    }
}

