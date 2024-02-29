import * as style from "/src/styles/fullpageIframe.module.css"

/** A page showing my CV. */
export default function Cv() {
	return <div class={style.style}>
		<iframe title="CV" src="/__/cvFrame.html"></iframe>
	</div>
}
