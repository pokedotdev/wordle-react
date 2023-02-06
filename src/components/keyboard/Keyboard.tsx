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
		<div className="my-14 w-full rounded-2xl bg-gray-2/30 py-10 px-5 text-lg font-semibold dark:bg-gray-2/5">
			<div className="flex flex-col gap-2.5">
				<div className="flex gap-2.5 self-center">
					{KEYS[0].map((letter) => (
						<Key key={letter} onClick={() => onKeyPressed(letter)}>
							{letter}
						</Key>
					))}
				</div>
				<div className="mr-4 flex gap-2.5 self-end">
					{KEYS[1].map((letter) => (
						<Key key={letter} onClick={() => onKeyPressed(letter)}>
							{letter}
						</Key>
					))}
				</div>
				<div className="flex gap-2.5">
					<Key
						onClick={() => {
							enter()
						}}
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
			</div>
		</div>
	)
}

export const Key = ({ children, ...rest }: React.ComponentProps<'button'>) => {
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
		let output: LetterStatus = 'empty'
		for (const letter of flat) {
			if (letter.status === 'absent') {
				output = 'absent'
				break
			}
			if (letter.status === 'correct') {
				output = 'correct'
				break
			}
			if (letter.status === 'present') {
				output = 'present'
				break
			}
		}
		return output
	})

	return (
		<button
			className={cn(
				'h-[51px] min-w-[44px] rounded-md px-4',
				STATUS_STYLE[letterStatus]
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
