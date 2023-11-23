import { Route, Router, Routes } from '@solidjs/router'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import { lazy } from 'solid-js'

export default function App() {
	const originalPathname = window.location.pathname
	const url = sessionStorage.getItem("u")
	if (url) {
		sessionStorage.removeItem("u")
		window.history.replaceState(null, "", url)
	}

	return <Router >
		<MainLayout>
			<Routes base={import.meta.env?.DEV ? "/" : originalPathname}>
				<Route path={"/"} component={Home}/>
				<Route path={"/about"} component={lazy(() => import("./pages/About"))}/>
				<Route path={"/cv"} component={lazy(() => import("./pages/Cv"))}/>
				<Route path={"/*"} component={lazy(() => import("./pages/Missing"))}/>
			</Routes>
		</MainLayout>
	</Router>

}
