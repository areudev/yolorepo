import * as React from 'react'
import './key-press.css'
import { useKeyPress } from '../lib/use-key-press'
export default function App() {
	const [activeKey, setActiveKey] = React.useState('')

	const handleKeyPress = (e: Event) => {
		e.preventDefault()
		if (e instanceof KeyboardEvent && !e.repeat) {
			setActiveKey(e.key)
			setTimeout(() => {
				setActiveKey('')
			}, 600)
		}
	}

	useKeyPress('ArrowRight', handleKeyPress, {
		event: 'keyup',
	})
	useKeyPress('ArrowLeft', handleKeyPress)
	useKeyPress('ArrowUp', handleKeyPress)
	useKeyPress('ArrowDown', handleKeyPress)

	return (
		<section>
			<h1>useKeyPress</h1>
			<p>Press one of the arrow keys on your keyboard</p>
			<article>
				<button className={activeKey === 'ArrowUp' ? 'pressed' : ''}>
					<span>&uarr;</span>
				</button>
				<button className={activeKey === 'ArrowLeft' ? 'pressed' : ''}>
					<span>&larr;</span>
				</button>
				<button className={activeKey === 'ArrowDown' ? 'pressed' : ''}>
					<span>&darr;</span>
				</button>
				<button className={activeKey === 'ArrowRight' ? 'pressed' : ''}>
					<span>&rarr;</span>
				</button>
			</article>
			{Boolean(activeKey) && <label>{activeKey} was pressed</label>}
		</section>
	)
}
