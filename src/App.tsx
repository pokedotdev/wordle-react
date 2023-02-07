import * as React from 'react'
import { Board, Header, Keyboard } from '~/components'
import { useGameStore } from './store'

function App() {
	return (
		<div className="mx-auto max-w-screen-sm px-1">
			<Reset />
			<Header />
			<main className="flex flex-col items-center">
				<Board />
				<Keyboard />
			</main>
			<Solution />
		</div>
	)
}

function Solution() {
	const solution = useGameStore((state) => state.solution)
	return (
		<div className="fixed bottom-0 right-0 bg-black px-2 text-lg text-white">
			R: {solution}
		</div>
	)
}

function Reset() {
	React.useLayoutEffect(() => {
		const interval = setInterval(() => {
			useGameStore.getState().updateCountdown()
		}, 1000)

		return () => clearInterval(interval)
	}, [])
	return null
}

export default App
