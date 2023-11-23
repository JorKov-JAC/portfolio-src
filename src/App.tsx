import { Route, Router, Routes } from '@solidjs/router'
import Home from './pages/Home'
import Missing from './pages/missing'
import MainLayout from './layouts/MainLayout'

export default function App() {
	const url = sessionStorage.getItem("u")
	if (url) {
		sessionStorage.removeItem("u")
		window.history.replaceState(null, "", url)
	}

	return <Router >
		<MainLayout>
			<Routes base={import.meta.env?.DEV ? "/" : window.location.pathname}>
				<Route path={"/"} component={Home}/>
				<Route path={"/*"} component={Missing}/>
			</Routes>
		</MainLayout>
	</Router>

}
