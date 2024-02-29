# Source code for my portfolio website
Made with SolidJS and TypeScript.

## Single-page app (SPA) routing
This website uses [SPA routing](https://docs.solidjs.com/routing/installation-and-setup), which GitHub does not support. Technically, there are only the `index.html` and `404.html` pages. However, when trying to access a missing page, GitHub will go to the 404 page. There we store which page the user was trying to access, go to the index page, and then the index page can properly handle the route. This may break if hosted on a website which supports SPA.

# License
At time of writing, I reserve all rights to my code. If I later release this code under a license, note that the license only applies to the website itself, **not any of the included demos or other content** (examples: The Tribes movement game, my CV). You may learn from my website's code, but not copy it. I don't know why you'd want to learn from it.

# Building
- Ensure that you have installed [Node.js](https://nodejs.org).
- Ensure that you have installed [PNPM](https://pnpm.io/) (`npm i -g pnpm` will install it globally).
- Run `pnpm i`, then `pnpm run build` in the project's root.
- Files are output into `/dist/`. Push this directory's contents into a GitHub Pages root directory.
- Realize that you have no reason to build/deploy my portfolio website in the first place. I reserve all rights to my code at time of writing. You cannot use this as a template.
