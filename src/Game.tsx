import * as React from 'react'
import { Game, GameWithStats } from '~/types'
import { useCountdown, useWindow } from '~/hooks'
import * as storage from '~/services/storage'
import { getNewWord, isValidWord } from '~/services/words'
import { removeAccents } from '~/utils'
import { KEYS_FLAT } from '~/components'

const newGame = () => {
	const game: Game = {
		date: new Date(),
		solution: getNewWord(new Set(storage.getHistory())),
		guess: [],
		guesses: [],
		status: 'playing',
	}
	storage.storeGame(game)
	return game
}

const getGame = () => {
	const FIVE_MINUTES = 5 * 60 * 1000
	const storedGame = storage.getStoredGame() || newGame()
	const stats = storage.getStats()
	const isOld = new Date().getTime() - storedGame.date.getTime() > FIVE_MINUTES
	const game = isOld ? newGame() : storedGame
	const countdown = useCountdown(new Date(game.date.getTime() + FIVE_MINUTES))
	return { ...game, stats, countdown }
}

type GameContextType = GameWithStats & {
	countdown: ReturnType<typeof useCountdown>
}

export const GameContext = React.createContext<GameContextType | null>(null)
export const useGame = () => React.useContext(GameContext) || getGame()

export const GameProvider = ({ children }: React.PropsWithChildren) => {
	let game = getGame()
	// TODO: refactor
	const [date, setDate] = React.useState(game.date)
	const [solution, setSolution] = React.useState(game.solution)
	const [guess, setGuess] = React.useState(game.guess || [])
	const [guesses, setGuesses] = React.useState(game.guesses)
	const [status, setGameStatus] = React.useState(game.status)
	const [stats, setStats] = React.useState(game.stats)

	useWindow('keydown', handleKeyDown)

	React.useEffect(() => {
		if (game.countdown.expired) resetGame()
	}, [game.countdown.expired])

	React.useEffect(() => {
		if (status !== 'playing') saveGame()
	}, [status])

	function handleKeyDown(e: KeyboardEvent) {
		let key = e.key.toUpperCase()
		key = removeAccents(key)
		onKeyPressed(key)
	}

	function onKeyPressed(key: string) {
		if (status !== 'playing') return
		saveGame()
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

		if (currWord === solution) return onFinish(true)
		if (guesses.length >= 4) return onFinish(false)
		if (status === 'playing') saveGame()
	}

	function onFinish(won: boolean) {
		const history = storage.getHistory() || []
		if (history.includes(solution)) return
		storage.addToHistory(solution)
		storage.incrementPlays(won)
		setStats(storage.getStats())
		setGameStatus(won ? 'won' : 'lost')
	}

	function saveGame() {
		storage.storeGame({ date, solution, guesses, status })
	}

	function resetGame() {
		setDate(game.date)
		setSolution(game.solution)
		setGameStatus('playing')
		setGuesses([])
		setGuess([])
	}

	return (
		<GameContext.Provider
			value={{
				countdown: game.countdown,
				date,
				guess,
				guesses,
				solution,
				status,
				stats,
			}}
		>
			{children}
		</GameContext.Provider>
	)
}
