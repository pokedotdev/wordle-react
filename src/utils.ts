export const removeAccents = (str: string) => {
	return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export const addLeadingZeros = (num: number, totalLength: number) => {
	return String(num).padStart(totalLength, '0')
}
