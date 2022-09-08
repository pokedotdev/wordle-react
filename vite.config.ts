import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

import { fetchWords } from './scripts/fetch-words'

// https://vitejs.dev/config/
export default defineConfig(async ({ command, mode }) => {
	// Generate src/assets/words.json
	console.time('fetchWords')
	await fetchWords()
	console.timeEnd('fetchWords')

	return {
		plugins: [react(), tsconfigPaths()],
	}
})
