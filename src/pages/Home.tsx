import { A } from "@solidjs/router"
import { createSignal } from "solid-js"

export default function Home() {
	return <>
		<h1>Welcome to my Portfolio site!</h1>
		<p>
			Well met! Can I interest you in some of my <A href="projects">projects</A>?
		</p>
	</>
}
