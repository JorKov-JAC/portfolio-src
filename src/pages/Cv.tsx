import * as style from "/src/styles/fullpageIframe.module.css"

export default function Cv() {
	return <div class={style.style}>
		<iframe src="/__/cvFrame.html"></iframe>
	</div>
}
