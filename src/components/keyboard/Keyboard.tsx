import * as React from 'react'
import cn from 'clsx'
import { useGame } from '~/Game'
import { BackspaceIcon } from '~/components'
import type { LetterStatus } from '~/types'

export const Keyboard = () => {
	return (
		<div className="my-14 w-full rounded-2xl bg-gray-2/30 py-10 px-5 text-lg font-semibold dark:bg-gray-2/5">
			<div className="flex flex-col gap-2.5">
				<div className="flex gap-2.5 self-center">
					{KEYS[0].map((letter) => (
						<Key key="letter">{letter}</Key>
					))}
				</div>
				<div className="mr-4 flex gap-2.5 self-end">
					{KEYS[1].map((letter) => (
						<Key key="letter">{letter}</Key>
					))}
				</div>
				<div className="flex gap-2.5">
					<Key>ENTER</Key>
					{KEYS[2].map((letter) => {
						return <Key key="letter">{letter}</Key>
					})}
					<Key>
						<BackspaceIcon className="w-10" />
					</Key>
				</div>
			</div>
		</div>
	)
}

export const Key = (props: React.PropsWithChildren) => {
	const STATUS_STYLE: Record<LetterStatus, string> = {
		empty: 'bg-gray-3 text-[#56575E] dark:bg-gray-6 dark:text-white',
		absent: 'bg-gray-5 text-white',
		correct: 'bg-green-2 text-white',
		present: 'bg-yellow-1 text-white',
	} as const

	return (
		<button className={cn('h-[51px] rounded-md px-4', STATUS_STYLE['empty'])}>
			{props.children}
		</button>
	)
}

const isUsed = ({ letter }: { letter: string }) => {
	const game = useGame()
	const a = game.guesses
	return (
		<div className={a ? 'bg-gray-1/20 dark:bg-gray-1/10' : ''}>{letter}</div>
	)
}

export const KEYS = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
	['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]
export const KEYS_FLAT = KEYS.flat()
