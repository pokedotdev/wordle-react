import { GameStats } from '~/types'

// Stats

export const getStats = (): GameStats => {
	const stats = localStorage.getItem('stats')
	return stats ? JSON.parse(stats) : { plays: 0, wins: 0 }
}

export const setStats = (stats: GameStats) => {
	localStorage.setItem('stats', JSON.stringify(stats))
}

export const incrementPlays = (win: boolean) => {
	const stats = getStats()
	if (win) stats.wins++
	stats.plays++
	setStats(stats)
}

// History

export const getHistory = () => {
	const history = localStorage.getItem('history')
	return history ? JSON.parse(history) : []
}

export const addToHistory = (history: string) => {
	localStorage.setItem('history', JSON.stringify([history, ...getHistory()]))
}
