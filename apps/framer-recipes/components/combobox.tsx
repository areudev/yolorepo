import React, { createContext, useContext, useState } from 'react'
import type { UseComboboxReturnValue } from 'downshift'
import { useCombobox } from 'downshift'
import { Book, books } from './combobox-ex'

type MyComboboxType<T> = Pick<
	UseComboboxReturnValue<T>,
	| 'getInputProps'
	| 'getItemProps'
	| 'getLabelProps'
	| 'getMenuProps'
	| 'getToggleButtonProps'
	| 'highlightedIndex'
	| 'isOpen'
	| 'selectedItem'
> & {
	items: T[]
}

const ComboboxContext = createContext<MyComboboxType<unknown> | null>(null)

export function ComboboxProvider<T>({
	children,
	initialItems,
	filterFn,
}: {
	children: React.ReactNode
	initialItems: T[]
	filterFn: (item: T, inputValue: string) => boolean
}) {
	const [items, setItems] = useState<T[]>(initialItems)
	const {
		isOpen,
		getToggleButtonProps,
		getLabelProps,
		getMenuProps,
		getInputProps,
		highlightedIndex,
		getItemProps,
		selectedItem,
	} = useCombobox<T>({
		onInputValueChange({ inputValue }) {
			setItems(initialItems.filter(item => filterFn(item, inputValue)))
		},
		items,
	})
	const value: MyComboboxType<T> = {
		isOpen,
		getToggleButtonProps,
		getLabelProps,
		getMenuProps,
		getInputProps,
		highlightedIndex,
		getItemProps,
		selectedItem,
		items,
	}

	return (
		<ComboboxContext.Provider value={value}>
			<div className="flex w-72 flex-col gap-1">{children}</div>
		</ComboboxContext.Provider>
	)
}

export function useComboboxContext<T>() {
	const context = useContext(ComboboxContext) as MyComboboxType<T> | null
	if (context === null) {
		throw new Error('useComboboxContext must be used within a ComboboxProvider')
	}

	return context
}

export function ComboboxLabel({ children }: { children: React.ReactNode }) {
	const { getLabelProps } = useComboboxContext<unknown>()

	return (
		<label className="w-fit" {...getLabelProps()}>
			{children}
		</label>
	)
}

export function ComboboxInput() {
	const { getInputProps } = useComboboxContext<unknown>()

	return (
		<input
			placeholder="Best book ever"
			className="w-full p-1.5"
			{...getInputProps()}
		/>
	)
}

export function ComboboxToggleButton() {
	const { getToggleButtonProps, isOpen } = useComboboxContext<unknown>()

	return (
		<button
			aria-label="toggle menu"
			className="px-2"
			type="button"
			{...getToggleButtonProps()}
		>
			{isOpen ? <>&#8593;</> : <>&#8595;</>}
		</button>
	)
}

export function ComboboxMenu({
	renderItem,
}: {
	renderItem: (item: unknown) => React.ReactNode
}) {
	const { getMenuProps, getItemProps, items, isOpen } =
		useComboboxContext<unknown>()

	if (!isOpen) {
		return null
	}
	return (
		<ul className="bg-white shadow-sm" {...getMenuProps()}>
			{items.map((item, index) => (
				<li key={index} className="p-1" {...getItemProps({ item, index })}>
					{renderItem(item)}
				</li>
			))}
		</ul>
	)
}

export function Combooo() {
	return (
		<>
			<ComboboxProvider<Book>
				filterFn={(item, inputValue) =>
					!inputValue ||
					item.title.toLowerCase().includes(inputValue.toLowerCase()) ||
					item.author.toLowerCase().includes(inputValue.toLowerCase())
				}
				initialItems={books}
			>
				<ComboboxLabel>Choose your favorite book:</ComboboxLabel>
				<div className="flex gap-0.5 bg-white shadow-sm">
					<ComboboxInput />
					<ComboboxToggleButton />
				</div>
				<ComboboxMenu
					renderItem={(item: Book) => (
						<>
							<p>{item.title}</p>
							<p>{item.author}</p>
						</>
					)}
				/>
			</ComboboxProvider>
			<p>hello</p>
		</>
	)
}
