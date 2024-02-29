/* @refresh reload */
import { render } from 'solid-js/web'

import './index.css'
import App from './App'

const root = document.getElementById('root')!

// Render SolidJS content:
render(() => <App />, root)
