export const removeAccents = (str: string) => {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export const addLeadingZeros = (num: number, totalLength: number) => {
	return String(num).padStart(totalLength, '0')
}

export const formatClock = (countDown: number) => {
	const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
	const hours = Math.floor(
		(countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	)
	const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

	return { days, hours, minutes, seconds }
}
