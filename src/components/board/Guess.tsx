import { Letter } from '~/components'
import { LetterData } from '~/types'
import { useGameStore } from '~/store'

type GuessProps = {
	guess: LetterData[]
	isExample?: boolean
}

export const Guess = ({ guess = [], isExample = false }: GuessProps) => {
	const fill: LetterData[] = Array.from({ length: 5 - guess.length }).map(
		() => ({ status: 'empty' })
	)
	const list = [...guess, ...fill]

	return (
		<div className="flex gap-3">
			{list.map((letter, i) => (
				<Letter
					key={i}
					value={letter.value}
					status={letter.status}
					isExample={isExample}
				/>
			))}
		</div>
	)
}
