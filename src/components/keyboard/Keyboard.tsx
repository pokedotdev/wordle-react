import { KEYS, KEYS_FLAT, useGame } from '~/Game'

export const Keyboard = () => {
	return (
		<div className="my-14 w-full rounded-2xl bg-gray-2/30 py-10 px-5 text-lg font-semibold dark:bg-gray-2/5">
			<div className="flex gap-1">
				{KEYS[0].map((letter, i) => {
					return (
						<div key={letter} className="">
							{letter}
						</div>
					)
				})}
			</div>
		</div>
	)
}

const isUsed = ({ letter }: { letter: string }) => {
	const game = useGame()
	const a = game.guesses
	return (
		<div className={a ? 'bg-gray-1/20 dark:bg-gray-1/10' : ''}>{letter}</div>
	)
}

const KeyStyles = {
	base: 'w-11 h-12 rounded-md',
}
