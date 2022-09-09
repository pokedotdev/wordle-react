export type LetterStatus = 'empty' | 'absent' | 'present' | 'correct'

export type LetterData = {
	value?: string
	status: LetterStatus
}

export type GameStats = {
	plays: number
	wins: number
}

export type GameStatus = 'playing' | 'won' | 'lost'

export type Game = {
	date: Date
	solution: string
	guess: LetterData[]
	guesses: LetterData[][]
	status: GameStatus
}

export type GameWithStats = Game & { stats: GameStats }
