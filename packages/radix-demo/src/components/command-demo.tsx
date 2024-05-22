import { useEffect, useState } from 'react'
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '../lib/command'
import { Command } from '../lib/command-dialoged'

export function CommandDemo() {
	const [open, setOpen] = useState(false)

	// useEffect(() => {
	// 	const down = (e: KeyboardEvent) => {
	// 		if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
	// 			e.preventDefault()
	// 			setOpen(open => !open)
	// 		}
	// 	}
	// 	document.addEventListener('keydown', down)
	// 	return () => document.removeEventListener('keydown', down)
	// }, [])

	return (
		<div className="flex items-center justify-center">
			<Command>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Suggestions">
						<CommandItem>Calendar</CommandItem>
						<CommandItem>Search Emoji</CommandItem>
						<CommandItem>Calculator</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
			<button
				onClick={() => {
					setOpen(open => !open)
				}}
			>
				Click me
			</button>
		</div>
	)
}
