import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "../styles/EditForm.css"

export const EditReview = () => {
    const navigate = useNavigate()
    const {reviewId} = useParams()
    const {userId} = useParams()
    const [editReview, updateEditReview] = useState({
        userImage: "",
        userReview: ""
    })

    const localHaterUser = localStorage.getItem("hater_user")
    const haterUserObject = JSON.parse(localHaterUser)

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
                body: JSON.stringify(editReview)
            })
                .then(res => res.json())
                .then(()=> {
                    navigate(`/profile/${haterUserObject.id}`)
                })
    }


    
    
    
    
    return <div className="editReviewForm">
        <form>
            <h2 className="review__title">Edit Your Review</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reviewImage">Change the Film Still for Your Review:</label>
                    <input
                        required autoFocus
                        id="reviewImage"
                        placeholder={`Enter an image URL`}
                        type="text"
                        className="form-control"
                        value={editReview.userImage}
                        onChange={
                            (evt) => {
                                // TODO: Update address property
                                const copy = {...editReview}
                                copy.userImage = evt.target.value
                                updateEditReview(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="reviewBody">Revise Your Review:</label>
                    <input
                        required autoFocus
                        id="reviewBody"
                        placeholder={`Type or Paste Your Review Here`}
                        type="text"
                        className="form-control"
                        value={editReview.userReview}
                        onChange={
                            (evt) => {
                                // TODO: Update address property
                                const copy = {...editReview}
                                copy.userReview = evt.target.value
                                updateEditReview(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleUpdateButtonClick(clickEvent)}
                className="btn btn-primary">
                Edit Review!
            </button>
        </form>
    </div>
}