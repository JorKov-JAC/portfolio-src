import { Component, VoidComponent, lazy } from "solid-js";
import UiFps from "./projects/UiFps";
import { A, Route, Routes } from "@solidjs/router";
import Missing from "./Missing";

interface ProjectEntry {
	name: string,
	path: string,
	component: ReturnType<typeof lazy>
}

export default function Projects() {
	const projects: ProjectEntry[] = [
		{ name: "Jetpack & Ski Game (Tribes Clone)", path: "tribes-clone", component: lazy(() => import("./projects/UiFps")) }
	]

	// return <>
	// 	<p>Foo</p>
	// 	<Routes>
	// 		<Route path="/spleen" component={() => <p>Speeeee</p>}></Route>
	// 		<Route path="/projects/banana" component={() => <p>Banaan</p>}></Route>
	// 	</Routes>
	// </>

	const ProjectsList: VoidComponent = () => {
		return <>
			{projects.map(p => {
				return <A href={p.path}>{p.name}</A>
			})}
		</>
	}

	const TitledEntryPage: Component<ProjectEntry> = (p) => {
		return <><h1>{p.name}</h1>{p.component({})}</>
	}

	return <>
		<Routes>
			<Route path="/" component={ProjectsList}/>
			{projects.map(p => {
				return <Route path={p.path} component={() => TitledEntryPage(p)}/>
			})}
			<Route path="/*" component={Missing}/>
		</Routes>
	</>
}
