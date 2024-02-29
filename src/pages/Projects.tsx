import { Component, VoidComponent, lazy, type JSXElement } from "solid-js";
import { A, Route, Routes } from "@solidjs/router";
import Missing from "./Missing";
import ExternalA from "../components/ExternalA";

/** Handles routing for projects. */
export default function Projects() {

	return <>
		<Routes>
			<Route path="/" component={ProjectsList}/>
			{ /* Add routes for every project with route info: */ }
			{projects.filter(hasRouteInfo).map(p => {
				return <Route path={p.path} component={() => TitledEntryPage(p)}/>
			})}
			<Route path="/*" component={Missing}/>
		</Routes>
	</>
}

/**
 * Information for a project.
 */
type ProjectEntry = {
		/** The project title shown to the user. */
		name: string
		/** The URL to the project's repository. */
		repo: string
	}
	& (ProjectEntryRouteInfo | object)
	& ({
		/** The URL to the project's download link. */
		download: string
	} | object)

/**
 * Information for projects that can be visited locally on the site.
 */
type ProjectEntryRouteInfo = {
	/** The subdirectory for an online demo of the project. */
	path: string
	/** The project's page component. */
	component: ReturnType<typeof lazy>
}

/**
 * Checks that {@link p} is a {@link ProjectEntryRouteInfo}.
 */
function hasRouteInfo<T extends ProjectEntry>(p: T): p is T & ProjectEntryRouteInfo {
	if ("path" in p) {
		// Ensure that we've properly narrowed the type:
		p satisfies ProjectEntryRouteInfo;

		return true;
	}

	return false;
}

/** Information for every project. */
const projects: ProjectEntry[] = [
	{ name: "Tribes Jetpacking Clone", repo: "https://github.com/JorKov-JAC/tribes-movement-clone", path: "tribes-clone", component: lazy(() => import("./projects/TribesClone")) },
	{ name: "GPU Particles", repo: "https://github.com/JorKov-JAC/webgl1-particles", path: "gpu-particles", component: lazy(() => import("./projects/GpuParticles")) },
	{ name: "D&D Compendium App", repo: "https://github.com/JorKov-JAC/dnd-app", download: "https://github.com/JorKov-JAC/dnd-app/releases/download/v0.1.0/dnd_compendium.apk" }
]

/** Component which shows a list of all projects and their links. */
const ProjectsList: VoidComponent = () => {
	return <>
		<h1>Projects</h1>
		<ul>
			{projects.map(p => {
				// Add link components based on the project's info
				const links: (() => JSXElement)[] = []
				if (p.repo) links.push(() => <ExternalA href={p.repo}>Source Code</ExternalA>)
				if ("component" in p) links.push(() => <A href={p.path}>View Online</A>)
				if ("download" in p) links.push(() => <ExternalA href={p.download}>Download</ExternalA>)

				return <li>{p.name}: {
					// Join the links together with separators:
					links.map((e, i) => <>{i > 0 && <> - </>}{e()}</>)
				}</li>
			})}
		</ul>
	</>
}

/** Component which shows a specific project's page. */
const TitledEntryPage: Component<ProjectEntry & ProjectEntryRouteInfo> = (p) => {
	return <>
		<h1>{p.name}</h1>
		<ExternalA href={p.repo}>Source Code</ExternalA>
		{p.component({})}
	</>
}
