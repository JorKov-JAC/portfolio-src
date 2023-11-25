import { Component, VoidComponent, lazy } from "solid-js";
import { A, Route, Routes } from "@solidjs/router";
import Missing from "./Missing";
import ExternalA from "../components/ExternalA";

interface ProjectEntry {
	name: string
	path: string
	repo: string
	download?: string
	component?: ReturnType<typeof lazy>
}

export default function Projects() {
	const projects: ProjectEntry[] = [
		{ name: "Tribes Clone", path: "tribes-clone", repo: "https://github.com/JorKov-JAC/tribes-movement-clone", component: lazy(() => import("./projects/TribesClone")) },
		{ name: "GPU Particles", path: "gpu-particles", repo: "https://github.com/JorKov-JAC/webgl1-particles", component: lazy(() => import("./projects/GpuParticles")) }
	]

	const ProjectsList: VoidComponent = () => {
		return <>
			<h1>Projects</h1>
			<ul>
				{projects.map(p => {
					return <li>{p.name}: {p.repo && <ExternalA href={p.repo}>Source Code</ExternalA>}{p.component && <> - <A href={p.path}>View Online</A></>}</li>
				})}
			</ul>
		</>
	}

	const TitledEntryPage: Component<ProjectEntry> = (p) => {
		return <><h1>{p.name}</h1>{p.component!({})}</>
	}

	return <>
		<Routes>
			<Route path="/" component={ProjectsList}/>
			{projects.filter(p => p.component).map(p => {
				return <Route path={p.path} component={() => TitledEntryPage(p)}/>
			})}
			<Route path="/*" component={Missing}/>
		</Routes>
	</>
}
