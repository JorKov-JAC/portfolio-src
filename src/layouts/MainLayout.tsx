import { ParentComponent } from "solid-js"
import * as style from "./MainLayout.module.css"
import { A } from "@solidjs/router"
import ExternalA from "../components/ExternalA"

/** Main layout which contains the content for each page. */
const MainLayout: ParentComponent = (p) => {
	return <div class={style.style}>
		<div>
			<header>
				<A href="" class={style.home} end>Jordan Kovacs</A>
				<nav>
					<A href="projects">Projects</A>
					<A href="about">About Me</A>
					<A href="cv">CV</A>
					<div class={style.iconLinks}>
						<ExternalA href="https://github.com/JorKov-JAC"><div class={style.squareIcon}><img src="/__/GitHub_Icon.svg" alt="GitHub"/></div></ExternalA>
						<ExternalA href="https://www.linkedin.com/in/jordan-kovacs-5a2835297"><div class={style.squareIcon}><img src="/__/LinkedIn_Icon.svg" alt="LinkedIn"/></div></ExternalA>
					</div>
				</nav>
			</header>
			<main>
				<div>
					{p.children}
				</div>
			</main>
			<footer>
				<p>© Jordan Kovacs</p>
				<div>
					<p class={style.email}>jordan.kurt.kovacs@gmail.com</p>
					<p class={style.phone}>+ 1 514 292 6613</p>
				</div>
			</footer>
		</div>
	</div>
}

export default MainLayout
