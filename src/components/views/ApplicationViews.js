import { Outlet, Route, Routes } from "react-router-dom"
import { NYTReviews } from "../NYTReviews"



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

                <Route path="nytReviews" element={ <NYTReviews /> } />

            </Route>
        </Routes>
    )
}

