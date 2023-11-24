import * as style from "/src/styles/fullpageIframe.module.css"

export default function Cv() {
	return <div class={style.style}>
		<iframe title="CV" src="/__/cvFrame.html"></iframe>
	</div>
}
