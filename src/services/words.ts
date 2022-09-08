import words from '~/assets/words.json' assert { type: 'json' }

const WORDS = new Set(words)
// const VALID_WORDS = new Set(words.map((word) => word.toUpperCase()))
const WORDS_COUNT = WORDS.size

export const getWords = () => WORDS

export const isValidWord = (word: string) => WORDS.has(word.toLowerCase())

export const getWord = () => {
	const index = Math.floor(Math.random() * WORDS_COUNT)
	return Array.from(WORDS)[index]
}
