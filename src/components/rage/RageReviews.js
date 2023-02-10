import { Link, useNavigate } from "react-router-dom"

export const RageReviews = ({rageObjects, honoredReviews, rageReviews, getAllRageReviews}) => {
    const localHaterUser = localStorage.getItem("hater_user")
    const haterUserObject = JSON.parse(localHaterUser)

    const navigate = useNavigate()
    
    
    const findHonoredReview = (currentReviewId) => {
        const foundHonoredReview = honoredReviews.find((honoredReview) => {
            return honoredReview.reviewId === currentReviewId && honoredReview.userId === haterUserObject.id
        })
        return foundHonoredReview
    }

    const handleRageButton = (reviewId, currentRage) => {
        const updateRage = {
            rage: currentRage + 1,
            enraged: true
        }

        const createRageObject = {
            userId: haterUserObject.id,
            reviewId: reviewId
        }
        
        return <button onClick={
            () => {
            return fetch(`http://localhost:8088/reviews/${reviewId}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updateRage)
                    })
                    .then(res => res.json())
                    .then(() => {
                        return fetch (`http://localhost:8088/rageObjects`, {
                            method: "POST",
                            headers: {
                            "Content-Type": "application/json"
                            },
                            body: JSON.stringify(createRageObject)
                        })
                        .then(res => res.json())
                        .then(() => {
                            getAllRageReviews()
                        })
                        
                    })
            }
        }
        type="submit" className="rageButton">Rage?</button>
    }

    const handleEnragedButton = (reviewId, currentRage) => {
        const updateRage = {
            rage: currentRage - 1,
            enraged: false
        }
        
        return <button onClick={
            () => {
            return fetch(`http://localhost:8088/reviews/${reviewId}`, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(updateRage)
                    })
                    .then(res => res.json())
                    .then(() => {
                        const foundRageObject = rageObjects.find((rageObject) => {
                            return rageObject.reviewId === reviewId && rageObject.userId === haterUserObject.id
                        })
                        return fetch (`http://localhost:8088/rageObjects/${foundRageObject.id}`, {
                            method: "DELETE",
                        })
                        .then(() => {
                            getAllRageReviews()
                        })
                    })
            }
        }
        type="submit" className="enragedButton">Enraged!</button>
    }

    const handleHonorButton = (currentReviewId) => {
    
        const sendToHonoredReviews = {
            userId: haterUserObject.id,
            reviewId: currentReviewId
        }
    
        return <button onClick={
            () => {
            return fetch("http://localhost:8088/honoredReviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendToHonoredReviews)
            })
                .then(res => res.json())
                .then(() => {
                    getAllRageReviews()
                })
            }
        }
        type="submit" className="honorButton">Honor?</button>
    
    
    }

    const handleHonoredButton = (currentReviewId) => {
        return <button onClick={
            () => {
                const honored = findHonoredReview(currentReviewId)
                return fetch(`http://localhost:8088/honoredReviews/${honored.id}`, {
                    method: "DELETE"
                })
                    .then(() => {
                        getAllRageReviews()
                    })
            }
        } className="honoredButton">Honored!</button>
    }

    
    
    const deleteButton = (reviewId) => {
        return <button onClick={() => {
            fetch(`http://localhost:8088/reviews/${reviewId}`, {
                method: "DELETE"
            })
                .then(() => {
                    getAllRageReviews()
                })
        }} className="review__delete">Delete</button>
    }

    const editButton = (reviewId) => {
        return <button onClick={() => {
            navigate(`../edit/${haterUserObject.id}/${reviewId}`)
        }} className="review__edit">Edit</button>
    }

    const makeHonorsAvailable = (userReviewId) => {
        return undefined === honoredReviews.find(honoredReview => honoredReview.reviewId === userReviewId)
                    ? handleHonorButton(userReviewId)
                    : handleHonoredButton(userReviewId)
    }

    const makeRageAvailable = (userReview, currentRage) => {
        const foundRageObject = rageObjects.find((rageObject) => {
            return rageObject.reviewId === userReview.id && rageObject.userId === haterUserObject.id
        })
        return undefined === foundRageObject
            ? handleRageButton(userReview.id, currentRage)
            : handleEnragedButton(userReview.id, currentRage)
    }

    return <div className="rageList">
                {
                    rageReviews.map((rageReview) => {
                        return <section className="review" key={rageReview.id}>
                                    <p>NYTMRHC User: {rageReview.user.fullName}</p>
                                    <p>Film Title: <i>{rageReview.nytTitle}</i></p>
                                    <p><i>NYT</i> Critic: {rageReview.nytReviewer}</p>
                                    <p>Rage Count: {rageReview.rage}</p>
                                    <Link className="reviewLink" to={`../profile/${rageReview.userId}/${rageReview.id}`}>See Full Review</Link>
                                    <div className="review-buttons">
                                        {
                                            haterUserObject.id === rageReview.userId
                                                ? deleteButton(rageReview.id)
                                                : ""
                                            
                                        }
                                        {
                                            rageReview.userId === haterUserObject.id
                                                ? editButton(rageReview.id)
                                                : ""
                                        }
                                        {
                                            rageReview.userId === haterUserObject.id
                                                ? makeHonorsAvailable(rageReview.id)
                                                : ""
                                        }
                                        {
                                            rageReview.userId !== haterUserObject.id
                                                ? makeRageAvailable(rageReview, rageReview.rage)
                                                : ""
                                        }
                                    </div>
                                </section>
                    })
                } 
            </div>
}