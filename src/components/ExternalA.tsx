import { ParentComponent } from "solid-js"

/** An anchor element (link) to an external site. */
const ExternalA: ParentComponent<{href: string}> = (p) => {
	return <a href={p.href} target="_blank" rel="nofollow noreferrer external">{p.children}</a>
}

export default ExternalA
