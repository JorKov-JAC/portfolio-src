import { ParentComponent } from "solid-js"
import * as style from "./MainLayout.module.css"
import { A } from "@solidjs/router"

const MainLayout: ParentComponent = (p) => {
	return <div class={style.main}>
		<div>
			<header>
				<A href="" class={style.home}>Jordan Kovacs</A>
				<nav>
					<A href="about">About Me</A>
					<A href="cv">CV</A>
				</nav>
			</header>
			<main>
				<div>
					{p.children}
				</div>
			</main>
			<footer>
				© Jordan Kovacs
			</footer>
		</div>
	</div>
}

export default MainLayout
