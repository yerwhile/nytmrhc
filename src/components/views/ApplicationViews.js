import { Outlet, Route, Routes } from "react-router-dom"
import { NYTReviewForm } from "../nytReviews/NYTReviewForm"
import { NYTReviewsSearch } from "../nytReviews/NYTReviewsSearch"
import { Profile } from "../profiles/Profile"
import { ProfileReview } from "../profiles/ProfileReview"
import { UserReviewSearch } from "../userReviews/UserReviewSearch"
import "../styles/NYTMRHC.css"
import { Rage } from "../rage/Rage"
import { EditReview } from "../edit/EditReview"
import { EditProfile } from "../edit/EditProfile"



export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <div className="container">
                    <h2><i>NYT</i> Movie Review Haters Collective</h2>
                    <h4>Where grudges are screened daily.</h4>

                    <Outlet />
                </div>
            }>
                <Route path="nytReviews" element={ <NYTReviewsSearch /> } />
                <Route path="nytReviews/:reviewId/:userId/create" element={ <NYTReviewForm /> } />
                <Route path="userReviews" element={ <UserReviewSearch/> } />
                <Route path="profile/:userId" element={ <Profile /> } />
                <Route path="profile/:userId/:reviewId" element={ <ProfileReview /> } />
                <Route path="rage" element={ <Rage /> } />
                <Route path="edit/:userId/:reviewId" element={<EditReview /> } />
                <Route path="edit/:userId" element={<EditProfile />} />

            </Route>
        </Routes>
    )
}

