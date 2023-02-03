import { Route, Routes } from "react-router-dom"
import { Authorized } from "./views/Authorized"
import { ApplicationViews } from "./views/ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import "./styles/NYTMRHC.css"


export const NYTMRHC = () => {

	const localHaterUser = localStorage.getItem("hater_user")
    const haterUserObject = JSON.parse(localHaterUser)

	// const [currentUserName, setCurrentUserName] = useState("")

	// const getCurrentUserName = () => {
	// 	fetch(`http://localhost:8088/users/${haterUserObject.id}`)
	// 	.then(res => res.json())
	// 	.then((userObj) => {
	// 		setCurrentUserName(userObj.fullName)
	// 	})
	// }

	// useEffect(() => {
	// 	getCurrentUserName()
	// }, [haterUserObject])

	return <Routes>
		<Route path="/login" element={<Login />} />
		<Route path="/register" element={<Register />} />

		<Route path="*" element={
			<Authorized>
				<>
					<NavBar />
					<ApplicationViews />
				</>
			</Authorized>

		} />
	</Routes>
}

