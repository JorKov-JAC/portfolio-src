import MaxSizeIframe from "../../components/MaxSizeIframe"

export default function UiFps() {
	return <>
		<p>For the final project of my second-semester UI course, we were tasked with creating tiny JavaScript games to add to WordPress sites. I ended up overdoing it and creating this Tribes-inspired movement game instead. There is no goal, just fly around!</p>
		<p>Special thanks to Spencer Paradis for showing interest in my creation.</p>
		<MaxSizeIframe title="Game" src="/__/projects/tribesClone/index.html"/>
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
		<p>Skiing removes all of your friction. To gain speed, you need to jetpack up hills and ski down slopes, creating a cycle between Height -&gt; Downward speed -&gt; Horizontal speed -&gt; Upward speed.</p>
		<div style={{display: "flex", "flex-direction": "column", "align-items": "center", margin: "1em"}}>
			<img src="/tribes_movement.webp" style={{"max-width": "100%"}}/>
			<p>Image from Tribes: Ascend</p>
		</div>
	</>
}
