import * as style from "./TribesClone.module.css"

export default function UiFps() {
	return <div class={style.style}>
		<h2>Controls</h2>
		<p>Click on the game to start playing!</p>
		<ul>
			<li>ESC — Stop Playing</li>
			<li>WASD — Move</li>
			<li>Mouse or Arrow Keys — Look</li>
			<li>Right Click — Use Jetpack</li>
			<li>Space — Ski</li>
			<li>X — Toggle Freecam</li>
			<li>Shift (while in Freecam) — Move Fast</li>
		</ul>
		<iframe title="Game" src="/__/projects/tribesClone/index.html" onLoad={({target: e}) => { e.style.aspectRatio = e.scrollWidth / e.contentWindow.document.body.scrollHeight}}></iframe>
		<h2>Context</h2>
		<p>TODO</p>
		{/* <p>In my second semester of my computer science program, we were asked to create basic </p> */}
	</div>
}
