import ExternalA from "../../components/ExternalA";
import MaxSizeIFrame from "../../components/MaxSizeIframe";

/** My WebGL1 GPU particles tech demo. */
export default function GpuParticles() {
	return <>
		<p>These are particles running on the GPU using WebGL1. The colourful pixels in the bottom left represent the actual data being processed.</p>
		<MaxSizeIFrame title="Particles Demo" src="/__/projects/gpuParticles/index.html"/>
		<h2>Description</h2>
		<p>This is a tech demo for GPU accelerated particles using WebGL1 without extensions.</p>
		<h3>What are GPU Particles?</h3>
		<p>First, let's cover how simple bouncing particles might be handled on the CPU: You store a series of particles in an array. Each particle stores position information and velocity. Every frame, you loop through the array of particles and update each one, shifting their position based on their velocity and inverting their velocity whenever they reach the edge of the screen. This array is stored in RAM. After updating the particles, you draw them. This means that the CPU (which updates data) needs to send information about the particles to the GPU (which renders the particles), and this can present a bottleneck since the bandwidth between the CPU and GPU is limited. Furthermore, the GPU is designed for processing large amounts of data; wouldn't it be great if we could leverage its parallel processing power to do all of these particle calculations?</p>
		<p>Enter GPU particles. Instead of processing particles on the CPU, we get the GPU to store and update the particles itself. And with modern GPUs, we have access to compute shaders which allow us to run such code in a straightforward manner. Great!</p>
		<h3>The problem with WebGL</h3>
		<p>At time of writing, webpages cannot take advantage of compute shaders. Browsers only expose access to WebGL (and more recently, WebGL2), which is very limited compared to what native programs have access to. Whereas compute shaders support general computing, older APIs like WebGL are designed solely for the GPU's original purpose: Drawing stuff. To perform actual calculations with WebGL, we'll need to twist the rendering process into performing computations, which means that we need to work with vertices and textures. But that isn't so bad; vertices are basically just collections of numbers, and since WebGL 2 supports <ExternalA href="https://developer.mozilla.org/en-US/docs/Web/API/WebGLTransformFeedback">transform feedback</ExternalA>, we can just perform calculations on these vertices directly. It's not too different from using an array.</p>
		<h4>I'm not using WebGL2.</h4>
		<p>That doesn't scratch the itch. I want the full, cursèd experience of doing compuations with colours! So let's limit ourselves to WebGL 1 (without extensions), and store data directly in a texture. We'll only use vertices for rendering the particles themselves. If we need to store position and velocity in 2D then that's 4 numbers, so surely an 8-bit RGBA texture will do; that way every particle is stored as a single pixel in the texture, where a pixel's redness is the particle's X position, greenness its Y position, blueness its X velocity, and opacity its Y velocity.</p>
		<p>Nope. There are only 8 bits per channel. That might be fine velocity, but for position? Particles need more than a 256x256 grid, otherwise they need to move really fast (otherwise they won't be able to escape their grid's cell; if they don't have enough speed to leave their current grid position, any incremental progress would get truncated back to 0 and they'd stay in the same place). 16 bits, giving us a 65536x65536 grid, would be better.</p>
		<p>So we'll use two adjacent pixels per particle in an 8-bit RGB texture! The left pixel stores the high bytes of the X/Y position as red/green and the X velocity as blue. The right pixel stores the low bytes in red/green and the Y velocity as blue.</p>
		<p>For illustration, this data texture is shown as a hypnotic collection of colours in the corner of the screen.</p>
		<h3>Terminology</h3>
		<ul>
			<li>Shader: A GPU program. There are always two in WebGL; a vertex shader followed by a fragment shader.</li>
			<li>Vertex: Represents the corner of a shape; a vertex shader outputs the corners of a triangle, after which WebGL performs "rasterization" and fills in the triangle using a fragment shader.</li>
			<li>Fragment: Basically a pixel; a fragment shader is a shader that renders pixels (either to a texture or to a screen).</li>
		</ul>
		<h3>The process</h3>
		<p>Every frame:</p>
		<ul>
			<li>Using the current particle data texture, we render a new texture with the updated particle positions and velocities.</li>
			<ul>
				<li>This is done through a fragment shader; every fragment reads a pair of pixels from the data texture, converts their colours to particle data, updates the particle, and converts the particle's new state back into colours.</li>
			</ul>
			<li>Using the new texture, we render every particle at their position.</li>
			<ul>
				<li>Every particle is a square, so there are 4 vertices each.</li>
				<li>Then a fragment shader renders a circular particle within that square.</li>
			</ul>
		</ul>
	</>
}
