export const ProfileReviews = ({userReviews}) => {
    return <div className="profileReviews">
                <h3>Your Reviews</h3>
                {
                    userReviews.map((userReview) => {
                        return <div className="userReview">
                                    <p>NYT Critic: {userReview.nytReviewer}</p>
                                    <p>Film Title: {userReview.nytTitle}</p>
                                    <hr></hr>
                                </div>
                    })
                } 
            </div>
}