import ExternalA from "../../components/ExternalA"
import MaxSizeIFrame from "../../components/MaxSizeIframe"

/** My tribes jetpacking/skiing game. */
export default function TribesClone() {
	return <>
		<p>For one of the final projects in my second semester, we were tasked with creating tiny JavaScript games to add to WordPress sites. I ended up overdoing it and creating this Tribes-inspired movement game instead. There is no goal, just fly around!</p>
		<p>Special thanks to Spencer Paradis for showing interest in my creation.</p>
		<MaxSizeIFrame title="Game" src="/__/projects/tribesClone/index.html"/>
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
			<img src="/__/tribes_movement.webp" style={{"max-width": "100%"}}/>
			<p>Image from Tribes: Ascend</p>
		</div>
		<h2>Description</h2>
		<p>This is a tribute to <ExternalA href="https://en.wikipedia.org/wiki/Tribes:_Vengeance">Tribes: Vengeance</ExternalA> created entirely from scratch using TypeScript and WebGL2.</p>
		<h3>Context</h3>
		<p>Tribes: Vengeance was one of the most formative games of my childhood; sometimes the first thing I would do in the morning was jetpack and ski on its varied levels for hours. This project tries to recreate the movement mechanics from that game.</p>
		<h3>How it works</h3>
		<h4>Rendering</h4>
		<p>The level is a grid of triangles. The height at each point in the grid is sampled from a height map which looks like so:</p>
		<div style={{display: "flex", "justify-content": "center"}}>
			<img src="/__/projects/tribesClone/res/heightmap.png" style={{}}/>
		</div>
		<p>The ground's normal map is also calculated from this map.</p>
		<h4>Physics</h4>
		<p>Physics are hard and my project had a deadline. So instead of worrying about collision code, the player is treated as a single point—they have no dimensions. Collisions are checked with the ground directly beneath the player's feet.</p>
		<p>The ground is made up of triangles, but using that for the ground's normal vectors would make skiing very bumpy. Instead, the ground's normal map is interpolated bilinearly, and that is used for clipping the player's velocity. This has a few side effects but provides relatively clean results.</p>
	</>
}
