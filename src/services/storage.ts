import { GameStats, Game } from '~/types'

export const getStoredGame = (): Game | undefined => {
	const game = localStorage.getItem('game')
	if (!game) return
	const data = JSON.parse(game)
	data.date = new Date(data.date)
	return data
}

export const storeGame = (game: Omit<Game, 'guess'>) => {
	localStorage.setItem('game', JSON.stringify(game))
}

// Stats

export const getStats = (): GameStats => {
	const stats = localStorage.getItem('stats')
	return stats ? JSON.parse(stats) : { plays: 0, wins: 0 }
}

export const setStats = (stats: GameStats) => {
	localStorage.setItem('stats', JSON.stringify(stats))
}

export const incrementPlays = (won: boolean) => {
	const stats = getStats()
	if (won) stats.wins++
	stats.plays++
	setStats(stats)
}

// History

export const getHistory = (): string[] => {
	const history = localStorage.getItem('history')
	return history ? JSON.parse(history) : []
}

export const addToHistory = (history: string) => {
	localStorage.setItem('history', JSON.stringify([history, ...getHistory()]))
}
