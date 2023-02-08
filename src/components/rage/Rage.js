import { useEffect, useState } from "react"
import { RageReviews } from "./RageReviews"
import "../styles/Rage.css"
import { RageUsers } from "./RageUsers"

export const Rage = () => {
    const [rageReviews, setRageReviews] = useState([])
    const [honoredReviews, setHonoredReviews] = useState([])
    const [rageObjects, setRageObjects] = useState([])
    const [users, setUsers] = useState([])

    const getAllRageReviews = () => {
        return fetch(`http://localhost:8088/reviews?_sort=rage&_expand=user&_order=desc`)
            .then(res => res.json())
            .then((reviewsArr) => {
                setRageReviews(reviewsArr)
            })
    }

    const getAllHonoredReviews = () => {
        return fetch(`http://localhost:8088/honoredReviews`)
        .then(res => res.json())
        .then((honoredArr) => {
            setHonoredReviews(honoredArr)
        })
    }

    const getAllRageObjects = () => {
        return fetch(`http://localhost:8088/rageObjects/?_expand=review&_expand=user`)
        .then(res => res.json())
        .then((rageObjectArr) => {
            setRageObjects(rageObjectArr)
        })
    }

    useEffect(() => {
		fetch(`http://localhost:8088/users`)
			.then(res => res.json())
			.then((data) => {
				setUsers(data)
			})
	}, [])

    useEffect(() => {
        getAllRageReviews()
    }, [])

    useEffect(() => {
        getAllHonoredReviews()
    }, [rageReviews])

    useEffect(() => {
        getAllRageObjects()
    }, [rageReviews])

    

    return <>
        <div className="rageRankings">
            <div className="rageReviews">
                <h3>Rage Ranking: Most Enraged User Reviews</h3>
                <RageReviews rageReviews={rageReviews} 
                getAllRageReviews={getAllRageReviews} 
                honoredReviews={honoredReviews}
                rageObjects={rageObjects} />
            </div>
            <div className="rageUsers">
                <h3>Most Enraged Users</h3>
                <RageUsers users={users} rageReviews={rageReviews}/>
            </div>
        </div>
        
    </>
}