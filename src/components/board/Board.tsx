import { Guess } from '~/components'
import { LetterData } from '~/types'
import { useGame } from '~/Game'

export const Board = () => {
	const game = useGame()
	const fill: LetterData[][] = Array.from({ length: 4 - game.guesses.length })
	const list = [...game.guesses, game.guess, ...fill].splice(0, 5)

	return (
		<div className="inline-flex flex-col gap-3">
			{list.map((word, i) => (
				<Guess key={i} guess={word} />
			))}
		</div>
	)
}
