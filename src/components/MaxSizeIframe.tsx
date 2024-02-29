import type { VoidComponent } from "solid-js"

/** An iframe which tries to be as big as possible. */
const MaxSizeIFrame: VoidComponent<{src: string, title: string}> = (p) => {
	return <iframe
		title={p.title}
		src={p.src}
		onLoad={lockIFrameTargetAspectRatio as any}
		style={{width: "100%"}}
	/>
}

/** Locks the aspect ratio of an event's targetted iframe. */
function lockIFrameTargetAspectRatio ({target}: {target: HTMLIFrameElement}) {
	// HACK Lock the iframe's aspect ratio so that we can resize it safely
	// (won't work if the iframe's aspect ratio isn't finalized on load)
	target.style.aspectRatio = target.scrollWidth / target.contentWindow!.document.body.scrollHeight + ""
}

export default MaxSizeIFrame
