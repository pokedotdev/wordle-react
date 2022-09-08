import * as React from 'react'
import { GameStats, LetterData } from '~/types'
import { useWindow } from '~/hooks'
import * as storage from '~/services/storage'
import { getWord, isValidWord } from '~/services/words'
import { removeAccents } from '~/utils'

export const GameContext = React.createContext({
	solution: '',
	guess: [] as LetterData[],
	guesses: [] as LetterData[][],
	gameOver: false,
	stats: { wins: 0, plays: 0 } as GameStats,
})
export const useGame = () => React.useContext(GameContext)

export const GameProvider = ({ children }: React.PropsWithChildren) => {
	const [solution, setSolution] = React.useState('')
	const [guess, setGuess] = React.useState<LetterData[]>([])
	const [guesses, setGuesses] = React.useState<LetterData[][]>([])
	const [gameOver, setGameOver] = React.useState(false)
	const [stats, setStats] = React.useState<GameStats>(storage.getStats())

	useWindow('keydown', handleKeyDown)

	React.useEffect(() => {
		setSolution('SEXTO')
		console.log(solution)
		const word = getWord()
	}, [])

	function handleKeyDown(e: KeyboardEvent) {
		let key = e.key.toUpperCase()
		key = removeAccents(key)
		onKeyPressed(key)
	}

	function onKeyPressed(key: string) {
		if (gameOver) return
		if (key === 'BACKSPACE') return onDelete()
		if (key === 'ENTER') return onEnter()
		if (guess.length >= 5) return
		if (KEYS_FLAT.includes(key)) return addLetter(key)
	}

	function addLetter(letter: string) {
		setGuess([...guess, { value: letter, status: 'empty' }])
	}

	function onDelete() {
		if (guess.length === 0) return
		setGuess(guess.slice(0, -1))
	}

	function onEnter() {
		if (guess.length !== 5) return
		const currWord = guess.map((letter) => letter.value).join('')
		if (!isValidWord(currWord)) return

		const newGuess = guess.map((letter, i) => {
			if (solution[i] === letter.value) letter.status = 'correct'
			else if (solution.includes(letter.value || '')) letter.status = 'present'
			else letter.status = 'absent'
			return letter
		})
		setGuesses([...guesses, newGuess])
		setGuess([])

		if (currWord === solution.toUpperCase()) return onFinish({ win: true })
		if (guesses.length >= 4) return onFinish({ win: false })
	}

	function onFinish({ win = false }) {
		const history = storage.getHistory() || []
		if (history.includes(solution)) return
		storage.addToHistory(solution)
		storage.incrementPlays(win)
		setStats(storage.getStats())
		setGameOver(true)
	}

	return (
		<GameContext.Provider
			value={{
				guess,
				guesses,
				solution,
				gameOver,
				stats,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}

export const KEYS = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
	['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
]
export const KEYS_FLAT = KEYS.flat()
