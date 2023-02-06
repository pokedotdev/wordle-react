import { Guess } from '~/components'
import { LetterData } from '~/types'
import { useGameStore } from '~/store'

export const Board = () => {
	const guesses = useGameStore((state) => state.guesses)
	const guess = useGameStore((state) => state.guess)
	const fill: LetterData[][] = Array.from({ length: 4 - guesses.length })
	const list = [...guesses, guess, ...fill].splice(0, 5)

	return (
		<div className="inline-flex flex-col gap-3">
			{list.map((word, i) => (
				<Guess key={i} guess={word} />
			))}
		</div>
	)
}
