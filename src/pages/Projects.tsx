import { Component, VoidComponent, lazy } from "solid-js";
import { A, Route, Routes } from "@solidjs/router";
import Missing from "./Missing";

interface ProjectEntry {
	name: string,
	path: string,
	component: ReturnType<typeof lazy>
}

export default function Projects() {
	const projects: ProjectEntry[] = [
		{ name: "Tribes Clone", path: "tribes-clone", component: lazy(() => import("./projects/TribesClone")) }
	]

	const ProjectsList: VoidComponent = () => {
		return <>
			<h1>Projects</h1>
			<ul>
				{projects.map(p => {
					return <li><A href={p.path}>{p.name}</A></li>
				})}
			</ul>
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
