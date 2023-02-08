import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./styles/NYTMRHC.css"
import { useEffect, useState } from "react"


export const NYTMRHC = () => {

	const localHaterUser = localStorage.getItem("hater_user")
    const haterUserObject = JSON.parse(localHaterUser)

	const [users, setUsers] = useState([])

	useEffect(() => {
		fetch(`http://localhost:8088/users`)
			.then(res => res.json())
			.then((data) => {
				setUsers(data)
			})
	}, [])

	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar users={users} />
					<ApplicationViews />
				</>
			</Authorized>

		} />
	</Routes>
}

