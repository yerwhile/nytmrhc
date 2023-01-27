import { Outlet, Route, Routes } from "react-router-dom"
import { Test } from "../Test"


export const AdminViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>NYT Movie Review Haters</h1>
                    <h3>Where grudges are screened daily.</h3>

                    <Outlet />
                </>
            }>

                <Route path="test" element={ <Test /> } />

            </Route>
        </Routes>
    )
}
