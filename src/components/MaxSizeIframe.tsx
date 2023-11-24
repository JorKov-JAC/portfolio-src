const MaxSizeIframe: VoidComponent<{src: string, title: string}> = (p) => {
	return <iframe
		title={p.title}
		src={p.src}
		onLoad={({target: e}) => { e.style.aspectRatio = e.scrollWidth / e.contentWindow.document.body.scrollHeight}}
		style={{width: "100%"}}
	/>
}

export default MaxSizeIframe
