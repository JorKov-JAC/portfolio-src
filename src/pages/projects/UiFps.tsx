import * as style from "./UiFps.module.css"

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
		<iframe src="/__/projects/uiFps/index.html" onLoad={({target: e}) => { e.style.height = e.contentWindow.document.body.scrollHeight+"px"}}></iframe>
	</div>
}
