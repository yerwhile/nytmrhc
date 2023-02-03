import { Outlet, Route, Routes } from "react-router-dom"
import { NYTReviewForm } from "../nytReviews/NYTReviewForm"
import { NYTReviewsSearch } from "../nytReviews/NYTReviewsSearch"
import { Profile } from "../profiles/Profile"
import { ProfileReview } from "../profiles/ProfileReview"
import { UserReviewSearch } from "../userReviews/UserReviewSearch"



export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h2>NYT Movie Review Haters Collective</h2>
                    <h4>Where grudges are screened daily.</h4>

                    <Outlet />
                </>
            }>

                <Route path="nytReviews" element={ <NYTReviewsSearch /> } />
                <Route path="nytReviews/:reviewId/:userId/create" element={ <NYTReviewForm /> } />
                <Route path="userReviews" element={ <UserReviewSearch/> } />
                <Route path="profile/:userId" element={ <Profile /> } />
                <Route path="profile/:userId/:reviewId" element={ <ProfileReview /> } />

            </Route>
        </Routes>
    )
}

