import { createSignal } from "solid-js"

export default function Home() {
	const [count, setCount] = createSignal(0)

	return <>
		<h1>Welcome to my Portfolio site!</h1>
		<div>
			<button onClick={() => setCount((count) => count + 1)}>
				count is {count()}
			</button>
			<p>
				Welcome to my page! Here's some code: <code>console.log("Hello world!")</code>
			</p>
		</div>
	</>
}
