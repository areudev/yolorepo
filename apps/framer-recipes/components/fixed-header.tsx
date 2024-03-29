'use client'

import {
	useMotionValue,
	useScroll,
	motion,
	useTransform,
	useMotionTemplate,
} from 'framer-motion'
import { useEffect } from 'react'

const clamp = (value: number, min: number, max: number) =>
	Math.min(Math.max(value, min), max)

function useBoundedScroll(bounds: number) {
	const { scrollY } = useScroll()
	const scrollYBounded = useMotionValue(0)
	const scrollYBoundedProgress = useTransform(
		scrollYBounded,
		[0, bounds],
		[0, 1],
	)
	useEffect(() => {
		return scrollY.on('change', current => {
			const previous = scrollY.getPrevious()
			const diff = current - (previous ?? current)
			const newScrollYBounded = scrollYBounded.get() + diff

			scrollYBounded.set(clamp(newScrollYBounded, 0, bounds))
		})
	}, [bounds, scrollY, scrollYBounded])

	return { scrollYBounded, scrollYBoundedProgress }
}

export function FixedHeader() {
	const bounds = 500
	const { scrollYBoundedProgress } = useBoundedScroll(bounds)
	const scrollYBoundedProgressThrottled = useTransform(
		scrollYBoundedProgress,
		[0, 0.7, 1],
		[0, 0, 1],
	)
	const height = useTransform(scrollYBoundedProgressThrottled, [0, 1], [80, 50])
	const opacity = useTransform(scrollYBoundedProgressThrottled, [0, 1], [1, 0])
	const scale = useTransform(scrollYBoundedProgressThrottled, [0, 1], [1, 0.9])

	return (
		<div className="mx-auto flex w-full max-w-3xl flex-1 overflow-hidden text-slate-600">
			<div className="z-0 flex-1 overflow-y-scroll">
				<motion.header
					style={{
						height,
						backgroundColor: useMotionTemplate`rgb(255 255 255 / ${useTransform(
							scrollYBoundedProgressThrottled,
							[0, 1],
							[1, 0.1],
						)})`,
					}}
					className="fixed inset-x-0 flex h-20  shadow backdrop-blur-md"
				>
					<div className="mx-auto flex w-full max-w-3xl items-center justify-between px-8">
						<motion.p
							style={{
								scale,
							}}
							className="flex origin-left items-center text-xl font-semibold uppercase"
						>
							<span className="-ml-1.5 inline-block -rotate-90 text-[10px] leading-[0]">
								The
							</span>
							<span className="-ml-1 text-2xl tracking-[-.075em]">
								Daily Bugle
							</span>
						</motion.p>
						<motion.nav
							style={{
								opacity,
							}}
							className="flex space-x-4 text-xs font-medium text-slate-400"
						>
							<a href="#">News</a>
							<a href="#">Sports</a>
							<a href="#">Culture</a>
						</motion.nav>
					</div>
				</motion.header>

				<main className="px-8 pt-28">
					<div className="h-10 w-4/5 rounded bg-slate-200 text-2xl font-bold" />
					<div className="mt-8 space-y-6">
						{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
						{[...Array(2)].map((_, i) => (
							<div key={i} className="space-y-2 text-sm">
								<p className="h-4 w-5/6 rounded bg-slate-200" />
								<p className="h-4 rounded bg-slate-200" />
								<p className="h-4 w-4/6 rounded bg-slate-200" />
							</div>
						))}
						<div className="h-64 rounded bg-slate-200" />
						{/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
						{[...Array(90)].map((_, i) => (
							<div key={i} className="space-y-2 text-sm">
								<p className="h-4 w-5/6 rounded bg-slate-200" />
								<p className="h-4 rounded bg-slate-200" />
								<p className="h-4 w-4/6 rounded bg-slate-200" />
							</div>
						))}
					</div>
				</main>
			</div>
		</div>
	)
}
