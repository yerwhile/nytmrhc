import { Outlet, Route, Routes } from "react-router-dom"
import { NYTReviewForm } from "../nytReviews/NYTReviewForm"
import { NYTReviewsSearch } from "../nytReviews/NYTReviewsSearch"
import { Profile } from "../profiles/Profile"



export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>NYT Movie Review Haters</h1>
                    <h3>Where grudges are screened daily.</h3>

                    <Outlet />
                </>
            }>

                <Route path="nytReviews" element={ <NYTReviewsSearch /> } />
                <Route path="nytReviews/:reviewId/:userId/create" element={ <NYTReviewForm /> } />
                <Route path="profile" element={ <Profile />} />

            </Route>
        </Routes>
    )
}

