import ExternalA from "../../components/ExternalA"
import MaxSizeIFrame from "../../components/MaxSizeIframe"

/** My Game Development final project StarCraft clone. */
export default function FarCraft() {
	return <>
		<p>For my final Game Development project, I chose to make an RTS inspired by <ExternalA href="https://en.wikipedia.org/wiki/StarCraft_(video_game)">StarCraft</ExternalA>. This was done solo and without using any starter code, meaning I had to write an entire engine in TypeScript. The project took 3.5 days and totalled approximately 3.5k lines of raw code at time of submission, though it has since been developed further.</p>
		<MaxSizeIFrame title="Game" src="/__/projects/farcraft/index.html"/>
		<h2>Controls</h2>
		<p>Click on the game to start playing!</p>
		<ul>
			<li>ESC — Stop Playing</li>
			<li>Mouse or Arrow Keys — Pan View</li>
			<li>Left Click — Select Unit</li>
			<li>Left Click (drag) — Select Multiple Units</li>
			<li>Shift + Left Click - Add Unit(s) to Selection</li>
			<li>Right Click — Isssue "Move" Command</li>
			<li>A — Isssue "Attack Move" Command</li>
		</ul>
		<h2>Design</h2>
		<p>The project required an initial design document which can be found <ExternalA href="https://github.com/JorKov-JAC/farcraft/blob/main/DesignDocument.md">here</ExternalA>.</p>
		<h2>Features</h2>
		<ul>
			<li>A custom save system which is capable of automatically serializing most objects and properly restores object references and prototypes. Everything from unit health to animations and events are saved perfectly. Saves can be loaded from the main menu.</li>
			<li>A custom UI system which propogates mouse events and properly handles dynamic screen ratios and resolutions.</li>
			<li>A sound system using the Web Audio API.</li>
		</ul>
		<h2>Attribution</h2>
		<p>See <ExternalA href="https://github.com/JorKov-JAC/farcraft/blob/main/assets/attribution.txt">here</ExternalA>.</p>
	</>
}
