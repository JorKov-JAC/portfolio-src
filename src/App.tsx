import { Route, Router, Routes } from '@solidjs/router'
import Home from './pages/Home'
import MainLayout from './layouts/MainLayout'
import { lazy } from 'solid-js'

export default function App() {
	// GitHub doesn't allow SPA routing, so when the user goes to a page, the
	// url they were trying to access is stored in session storage, they're sent
	// to the root URL, and then we can route them properly.
	const originalPathname = window.location.pathname
	const url = sessionStorage.getItem("u")
	if (url) {
		sessionStorage.removeItem("u")
		window.history.replaceState(null, "", url)
	}

	// Setup routes
	return <Router>
		<MainLayout>
			{/*
				HACK If we're developing locally, SPA routing works. Otherwise,
				because this site might not be hosted at the user's root (ex.
				"https://user.github.io/" vs
				"https://user.github.io/portfolio"), we need to guess what the
				root URL is:
			*/}
			<Routes base={import.meta.env?.DEV ? "/" : originalPathname}>
				<Route path={"/"} component={Home}/>
				<Route path={"/projects/*"} component={lazy(() => import("./pages/Projects"))}/>
				<Route path={"/about"} component={lazy(() => import("./pages/About"))}/>
				<Route path={"/cv"} component={lazy(() => import("./pages/Cv"))}/>
				<Route path={"/*"} component={lazy(() => import("./pages/Missing"))}/>
			</Routes>
		</MainLayout>
	</Router>

}
