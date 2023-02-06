import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getNewWord, isValidWord } from './services/words'
import { GameStatus, LetterData } from './types'

type GameState = {
	date: number
	solution: string
	guess: LetterData[]
	guesses: LetterData[][]
	status: GameStatus
	countdown: number
	plays: number
	wins: number
	history: string[]
	updateCountdown: () => void
	addLetter: (letter: string) => void
	removeLetter: () => void
	addToHistory: (word: string) => void
	incrementPlays: (won: boolean) => void
	enter: () => boolean
	finish: (won: boolean) => void
	reset: () => void
}
const EXPIRE = 5 * 60 * 1000

export const useGameStore = create<GameState>()(
	persist(
		(set, get) => ({
			date: Date.now(),
			guess: [],
			guesses: [],
			status: 'playing',
			countdown: EXPIRE,
			plays: 0,
			wins: 0,
			history: [],
			solution: getNewWord(new Set(get()?.history || [])),
			updateCountdown: () =>
				set((state) => {
					let countdown = state.date + EXPIRE - Date.now()
					if (countdown > EXPIRE) countdown = EXPIRE
					if (countdown < 1) {
						useGameStore.getState().reset()
						return { countdown: EXPIRE }
					}
					return { countdown }
				}),
			addLetter: (letter) =>
				set((state) => ({
					guess: [...state.guess, { value: letter, status: 'empty' }],
				})),
			removeLetter: () => set((state) => ({ guess: state.guess.slice(0, -1) })),
			incrementPlays: (won) =>
				set((state) => ({ plays: state.plays + 1, wins: state.wins + +won })),
			addToHistory: (word) =>
				set((state) => ({ history: [...state.history, word] })),

			finish: (won) => {
				const state = get()
				if (state.history.includes(state.solution)) return
				state.addToHistory(state.solution)
				state.incrementPlays(won)
				return set(() => ({ status: won ? 'won' : 'lost' }))
			},
			enter: () => {
				const state = get()
				if (state.guess.length !== 5) return false
				const currWord = state.guess.map((letter) => letter.value).join('')
				if (!isValidWord(currWord)) return false
				const newWord = state.guess.map((letter, i) => {
					if (state.solution[i] === letter.value) letter.status = 'correct'
					else if (state.solution.includes(letter.value || ''))
						letter.status = 'present'
					else letter.status = 'absent'
					return letter
				})
				// add word
				set(() => ({ guesses: [...state.guesses, newWord], guess: [] }))
				if (currWord === state.solution) state.finish(true)
				if (state.guesses.length >= 4) state.finish(false)
				return false
			},
			reset: () =>
				set(() => ({
					date: Date.now(),
					solution: getNewWord(new Set(get().history)),
					status: 'playing',
					countdown: EXPIRE,
					guess: [],
					guesses: [],
				})),
		}),
		{ name: 'game-storage' }
	)
)
