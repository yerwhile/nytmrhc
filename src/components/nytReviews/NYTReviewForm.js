import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const NYTReviewForm = () => {
    
    const navigate = useNavigate()
    const {reviewId} = useParams()
    const {userId} = useParams()
    const [profileInfo, updateProfileInfo] = useState({
        userImage: "",
        userReview: ""
    })

    const handleUpdateButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
            fetch(`http://localhost:8088/reviews/${reviewId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(profileInfo)
            })
                .then(res => res.json())
                .then(()=> {
                    navigate("/")
                })
    }


    
    
    
    
    return <div className="postReviewForm">
        <form className="review">
            <h2 className="review__title">Create Your Review</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reviewImage">Add Film Still to Your Review:</label>
                    <input
                        required autoFocus
                        id="reviewImage"
                        placeholder={`Enter an image URL`}
                        type="text"
                        className="form-control"
                        value={profileInfo.userImage}
                        onChange={
                            (evt) => {
                                // TODO: Update address property
                                const copy = {...profileInfo}
                                copy.userImage = evt.target.value
                                updateProfileInfo(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reviewBody">Compose Your Review:</label>
                    <input
                        required autoFocus
                        id="reviewBody"
                        placeholder={`Type or Paste Your Review Here`}
                        type="text"
                        className="form-control"
                        value={profileInfo.userReview}
                        onChange={
                            (evt) => {
                                // TODO: Update address property
                                const copy = {...profileInfo}
                                copy.userReview = evt.target.value
                                updateProfileInfo(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleUpdateButtonClick(clickEvent)}
                className="btn btn-primary">
                Post Review!
            </button>
        </form>
    </div>
}