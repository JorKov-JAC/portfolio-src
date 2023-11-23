import { Component } from "solid-js"
import { A } from "@solidjs/router"
import * as style from "./Missing.module.css";

const Missing: Component = () => {
	return <div class={style.style}>
		<h1>404</h1>
		<p>Quit snooping around, please stay on <A href="/">the trail</A>!</p>
	</div>
}

export default Missing
