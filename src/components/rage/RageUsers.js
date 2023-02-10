import { Link } from "react-router-dom"

export const RageUsers = ({users, rageReviews}) => {

    const allUserNames = users.map((user) => {
        return user.fullName
    })

    const usersEnraged = []

    for(let i = 0; i < allUserNames.length; i++) {
        let rageCount = 0
        let userId = null
        for(const rageReview of rageReviews) {
            if(rageReview.user.fullName === allUserNames[i]) {
                rageCount += rageReview.rage
                userId = rageReview.userId
            }
        }
        usersEnraged.push({
            userId: userId,
            fullName: allUserNames[i],
            rage: rageCount
        })
        rageCount = 0
        userId = null
    }
    
    usersEnraged.sort((a, b) => parseInt(b.rage) - parseInt(a.rage))

    return <ol>
        {
            usersEnraged.map((userEnraged) => {
                return <li className="rageUserList" >
                    <Link className="rageUserItem" to={`../profile/${userEnraged.userId}`}>{userEnraged.fullName}</Link>
                    <br></br>
                    (Total Rage Count: {userEnraged.rage})
                    </li>
            })
        }
    </ol>
}