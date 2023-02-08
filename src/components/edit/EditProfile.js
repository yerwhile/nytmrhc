import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "../styles/EditForm.css"

export const EditProfile = () => {
    const navigate = useNavigate()
    const {userId} = useParams()
    const [editProfile, updateEditProfile] = useState({
        fullName: "",
        email: "",
        about: "",
        image: ""
    })


    const handleUpdateButtonClick = (event) => {
        event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */
            fetch(`http://localhost:8088/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(editProfile)
            })
                .then(res => res.json())
                .then(()=> {
                    navigate(`/profile/${userId}`)
                })
    }


    
    
    
    
    return <div className="editProfileForm">
        <form>
            <h2 className="editProfile__title">Edit Your Profile</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="profileName">Change Your Name:</label>
                    <input
                        required autoFocus
                        id="profileName"
                        placeholder={`Enter your full name`}
                        type="text"
                        className="form-control"
                        value={editProfile.fullName}
                        onChange={
                            (evt) => {
                                // TODO: Update address property
                                const copy = {...editProfile}
                                copy.fullName = evt.target.value
                                updateEditProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="profileEmail">Change Your Email:</label>
                    <input
                        required autoFocus
                        id="profileEmail"
                        placeholder={`Enter your email`}
                        type="email"
                        className="form-control"
                        value={editProfile.email}
                        onChange={
                            (evt) => {
                                // TODO: Update address property
                                const copy = {...editProfile}
                                copy.email = evt.target.value
                                updateEditProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="profileAbout">Change Your About Me:</label>
                    <input
                        required autoFocus
                        id="profileAbout"
                        placeholder={`Enter an About Me message`}
                        type="text"
                        className="form-control"
                        value={editProfile.about}
                        onChange={
                            (evt) => {
                                // TODO: Update address property
                                const copy = {...editProfile}
                                copy.about = evt.target.value
                                updateEditProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="profileImage">Change Your Profile Image:</label>
                    <input
                        required autoFocus
                        id="profileImage"
                        placeholder={`Enter an image URL`}
                        type="text"
                        className="form-control"
                        value={editProfile.image}
                        onChange={
                            (evt) => {
                                // TODO: Update address property
                                const copy = {...editProfile}
                                copy.image = evt.target.value
                                updateEditProfile(copy)
                            }
                        } />
                </div>
            </fieldset>
            <div className="editButtons">
                <button
                    onClick={(clickEvent) => handleUpdateButtonClick(clickEvent)}
                    className="btn btn-primary">
                    Edit Review!
                </button>
                <button
                    onClick={(clickEvent) => navigate(`../profile/${userId}`)}
                    className="btn btn-primary">
                    Return to Profile
                </button>
            </div>
        </form>
    </div>
}