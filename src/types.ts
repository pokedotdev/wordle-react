export type LetterStatus = 'empty' | 'absent' | 'present' | 'correct'

export type LetterData = {
	value?: string
	status: LetterStatus
}

export type GameStats = {
	plays: number
	wins: number
}
