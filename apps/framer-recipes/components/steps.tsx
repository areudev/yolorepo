'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'

export function Steps() {
	const [step, setStep] = useState(1)

	return (
		<div className="flex min-h-screen items-start bg-gradient-to-br from-slate-700 to-slate-900 pt-40">
			<div className="mx-auto w-full max-w-md rounded-2xl bg-white">
				<div className="flex justify-between rounded p-8">
					<Step step={1} currentStep={step} />
					<Step step={2} currentStep={step} />
					<Step step={3} currentStep={step} />
					<Step step={4} currentStep={step} />
				</div>
				<div className="px-8 pb-8">
					<div>
						<div className="mt-2 h-6 w-40 rounded bg-slate-100" />
						<div className="mt-4 space-y-2">
							<div className="h-4 w-5/6 rounded bg-slate-100" />
							<div className="h-4 rounded bg-slate-100" />
							<div className="h-4 w-4/6 rounded bg-slate-100" />
						</div>
					</div>

					<div className="mt-10 flex justify-between">
						<button
							onClick={() => setStep(step < 2 ? step : step - 1)}
							className="rounded px-2 py-1 text-slate-400 hover:text-slate-700"
						>
							Back
						</button>
						<button
							onClick={() => setStep(step > 4 ? step : step + 1)}
							className={`${
								step > 4 ? 'pointer-events-none opacity-50' : ''
							} bg flex items-center justify-center rounded-full bg-blue-500 px-3.5 py-1.5 font-medium tracking-tight text-white hover:bg-blue-600 active:bg-blue-700`}
						>
							Continue
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}

function Step({ step, currentStep }: { step: number; currentStep: number }) {
	const status =
		currentStep === step
			? 'active'
			: currentStep < step
				? 'inactive'
				: 'complete'

	return (
		<motion.div animate={status} className="relative">
			<motion.div
				className="absolute inset-0 rounded-full bg-blue-200"
				variants={{
					active: {
						scale: 1,
						transition: {
							delay: 0,
							duration: 0.3,
						},
					},
					complete: {
						scale: 1.25,
					},
				}}
				transition={{
					duration: 0.4,
					delay: 0.1,
					type: 'tween',
					ease: 'circOut',
				}}
			/>
			<motion.div
				initial={false}
				variants={{
					inactive: {
						backgroundColor: '#fff',
						borderColor: 'var(--slate-200)',
						color: 'var(--slate-400)',
					},
					active: {
						backgroundColor: '#fff',
						borderColor: 'var(--blue-500)',
						color: 'var(--blue-500)',
					},
					complete: {
						backgroundColor: 'var(--blue-500)',
						borderColor: 'var(--blue-500)',
						color: '#fff',
					},
				}}
				transition={{ duration: 0.3 }}
				className={`relative flex h-10 w-10 items-center justify-center rounded-full border-2 font-semibold`}
			>
				<div className="flex items-center justify-center">
					{status === 'complete' ? (
						<CheckIcon className="h-6 w-6 text-white" />
					) : (
						<span>{step}</span>
					)}
				</div>
			</motion.div>
		</motion.div>
	)
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={3}
		>
			<motion.path
				initial={{ pathLength: 0 }}
				animate={{ pathLength: 1 }}
				transition={{
					delay: 0.1,
					type: 'tween',
					ease: 'easeInOut',
					duration: 0.3,
				}}
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M5 13l4 4L19 7"
			/>
		</svg>
	)
}
