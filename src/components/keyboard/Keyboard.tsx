import * as React from 'react'
import cn from 'clsx'
import { BackspaceIcon } from '~/components'
import type { LetterStatus } from '~/types'
import { useGameStore } from '~/store'
import { useWindow } from '~/hooks'
import { removeAccents } from '~/utils'

function onKeyPressed(key: string) {
	const game = useGameStore.getState()
	if (game.status !== 'playing') return
	if (key === 'BACKSPACE') return game.removeLetter()
	if (key === 'ENTER') return game.enter()
	if (game.guess.length >= 5) return
	if (KEYS_FLAT.includes(key)) return game.addLetter(key)
}

function handleKeyDown(e: KeyboardEvent) {
	let key = e.key.toUpperCase()
	key = removeAccents(key)
	onKeyPressed(key)
}

export const Keyboard = () => {
	const removeLetter = useGameStore((state) => state.removeLetter)
	const enter = useGameStore((state) => state.enter)
	useWindow('keydown', handleKeyDown)

	return (
		<div className="my-16 flex w-[638px] select-none flex-col gap-2.5 rounded-2xl bg-gray-2/30 py-8 px-6 text-lg font-semibold dark:bg-gray-2/5">
			{/* <div className="inline-flex w-full flex-col gap-2.5"> */}
			<div className="flex  gap-2.5 self-center">
				{KEYS[0].map((letter) => (
					<Key key={letter} onClick={() => onKeyPressed(letter)}>
						{letter}
					</Key>
				))}
			</div>
			<div className="flex gap-2.5 self-end">
				{KEYS[1].map((letter) => (
					<Key key={letter} onClick={() => onKeyPressed(letter)}>
						{letter}
					</Key>
				))}
			</div>
			<div className="flex gap-2.5 self-start">
				<Key
					onClick={() => {
						enter()
					}}
					className="text-sm"
				>
					ENTER
				</Key>
				{KEYS[2].map((letter) => {
					return (
						<Key key={letter} onClick={() => onKeyPressed(letter)}>
							{letter}
						</Key>
					)
				})}
				<Key
					onClick={() => {
						removeLetter()
					}}
				>
					<BackspaceIcon className="w-10" />
				</Key>
			</div>
			{/* </div> */}
		</div>
	)
}

export const Key = ({
	children,
	className,
	...rest
}: React.ComponentProps<'button'>) => {
	const STATUS_STYLE: Record<LetterStatus, string> = {
		empty: 'bg-gray-3 text-[#56575E] dark:bg-gray-6 dark:text-white',
		absent: 'bg-gray-5 text-white',
		correct: 'bg-green-2 text-white',
		present: 'bg-yellow-1 text-white',
	} as const

	const letterStatus: LetterStatus = useGameStore((state) => {
		const flat = state.guesses
			.flat()
			.filter((letter) => letter.value === children)
		if (flat.find((l) => l.status === 'absent')) return 'absent'
		if (flat.find((l) => l.status === 'correct')) return 'correct'
		if (flat.find((l) => l.status === 'present')) return 'present'
		return 'empty'
	})

	return (
		<button
			className={cn(
				'h-[51px] min-w-[44px] rounded-md px-4',
				STATUS_STYLE[letterStatus],
				className
			)}
			{...rest}
		>
			{children}
		</button>
	)
}

export const KEYS = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
	['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]
export const KEYS_FLAT = KEYS.flat()
