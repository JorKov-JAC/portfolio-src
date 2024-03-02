import { Component, VoidComponent, lazy, type JSXElement } from "solid-js";
import { A, Route, Routes } from "@solidjs/router";
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
			<Route path="/*" component={lazy(() => import("./Missing"))}/>
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
		/** For Concordia */
		medium: string,
		/** For Concordia */
		process: () => JSXElement,
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
	{
		name: "This Portfolio Website",
		repo: "https://github.com/JorKov-JAC/portfolio-src",
		medium: "TypeScript, SolidJS, vanilla CSS (with modules)",
		process: () => <>
			<p>This website was created to showcase my work, both as a portfolio and also to host my projects for others to play with. It was created in SolidJS and pure CSS, and was an excellent learning experience in creating a visually pleasing website which I can easily modify in the future, as well as in deploying websites on GitHub. I hoped that details such as the subtle pulsating lights would add a unique style, and that the use of routing (<ExternalA href="https://github.com/JorKov-JAC/portfolio-src?tab=readme-ov-file#single-page-app-spa-routing">which was difficult to implement for GitHub</ExternalA>) would provide a seamless and professional feel.</p>
		</>
	},
	{
		name: "FarCraft",
		repo: "https://github.com/JorKov-JAC/farcraft",
		path: "farcraft",
		component: lazy(() => import("./projects/FarCraft")),
		medium: "TypeScript",
		process: () => <>
			<p>For my final Game Development project, I chose to make an RTS inspired by StarCraft. This was done solo and without using any starter code, meaning I had to write an entire engine in TypeScript. The project took 3.5 days and totalled approximately 3.5k lines of raw code at time of submission. I had never made an RTS before and saw this an opportunity to challenge myself. My goal was to create an impressive demonstration of my technical abilities, not only for my teacher, but also to build my own confidence. Building a comprehensive engine from the ground up, including UI and saving systems, gave me a holistic appreciation for game engine design. With my newfound understanding of how every system in an engine can be implemented, I have been able to apply lessons from this project to all of game development projects since. Click "View Online" above for more details.</p>
		</>
	},
	{
		name: "Tribes Jetpacking Clone",
		repo: "https://github.com/JorKov-JAC/tribes-movement-clone",
		path: "tribes-clone", component: lazy(() => import("./projects/TribesClone")),
		medium: "TypeScript, WebGL2, GLSL",
		process: () => <>
			<p>In my second semester in the computer science program, our final UI project required that we make a simple JavaScript game to prove that we could add interactivity to sites made in WordPress. As I was already deeply comfortable with JavaScript, I decided to make my first ever proper 3D game. The resulting game, while lacking a win condition, was able to fully captivate one of my classmates—this was the first time someone had so genuinely enjoyed one of my creations. I manually derived all of the equations involved in an attempt to strengthen my vector math knowledge (deriving the transformation matrices proved to be a nightmare). This was also my first experience with OpenGL/WebGL, as well as with GLSL. I gained a great understanding of the way the OpenGL state machine works, the way information is exchanged with the GPU, and the way shaders and buffers are setup to generate graphics. I have since programmed multiple 3D engines using the lessons I took from this project. Click "View Online" above for more details.</p>
		</>
	},
	{
		name: "GPU Particles",
		repo: "https://github.com/JorKov-JAC/webgl1-particles",
		path: "gpu-particles",
		component: lazy(() => import("./projects/GpuParticles")),
		medium: "TypeScript, WebGL1, GLSL, GIMP",
		process: () => <>
			<p>Having previously made 3D graphics in WebGL, I wanted to experiment with running computations on the GPU, and doing so while limiting myself to purely graphical processing. This personal project illustrates how GPU calculations were done before more modern versions of graphics APIs were available—with data being stored as pixels in a texture, and shaders literally <i>drawing</i> their calculations into another texture—and was excellent practice for both shader programming and low-level OpenGL computation techniques. The results are visually pleasing, and being able to visually see the "brain" behind the program helps build curiosity in viewers about how GPU processing works. I plan to use these techniques to massively parallelize computations on the GPU in the future. Click "View Online" above for more details.</p>
		</>
	},
	{
		name: "D&D Compendium App",
		repo: "https://github.com/JorKov-JAC/dnd-app",
		download: "https://github.com/JorKov-JAC/dnd-app/releases/latest/download/dnd_compendium.apk",
		medium: "Kotlin, Jetpack Compose, Firebase, Android",
		process: () => <>
			<p>This was a semester-long group project done alongside <ExternalA href="https://github.com/MakenaH">Makena Howat</ExternalA> for our Application Development II course. We were tasked with making an Android app, and decided to make one for cataloguing information related to Dungeons & Dragons. Among other things, I was responsible for the Monsters part of the app, which involved programming in Kotlin (which is now one of my favourite languages), creating a UI using the Jetpack Compose framework, and setting up separate Firebase databases for monster data and images (the latter requiring care to avoid multithreading issues). We also performed thorough user testing and received feedback using anonymous surveys. This project forced me to get intimate with every stage of the app development cycle, and the results are fully usable for actual games of D&D. See <ExternalA href="https://github.com/JorKov-JAC/dnd-app">the source code</ExternalA> for more details and screenshots. The app can also be downloaded for Android devices by clicking "Download" above.</p>
		</>
	}
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

				return <li>
					{p.name}: {
						// Join the links together with separators:
						links.map((e, i) => <>{i > 0 && <> - </>}{e()}</>)
					}
					<p>Medium: {p.medium}</p>
					<div>
						{p.process()}
					</div>
				</li>
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
