import fs from 'node:fs/promises'
import * as path from 'path'

const API = 'https://gitlab.com/d2945/words/-/raw/main/words.txt'
const FILE_PATH = path.resolve(__dirname, '../src/assets/words.json')

export async function fetchWords() {
	const res = await fetch(API)
	const data = await res.text()
	const words = data.split('\n').filter((word) => {
		word = word.replace(/\s/g, '')
		// TODO: remove this filter & add support for words with accents
		const simple = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
		return word.length === 5 && simple === word
	})
	await fs.writeFile(FILE_PATH, JSON.stringify(words))
}
