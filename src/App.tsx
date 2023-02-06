import { Board, Header, Keyboard } from '~/components'
import { GameProvider, useGame } from '~/Game'

function App() {
	return (
		<div className="mx-auto max-w-screen-sm">
			<GameProvider>
				<Header />
				<main className="flex flex-col items-center">
					<Board />
					<Keyboard />
				</main>
				<Solution />
			</GameProvider>
		</div>
	)
}

function Solution() {
	const game = useGame()
	return (
		<div className="fixed bottom-0 right-0 bg-black px-2 text-lg text-white">
			R: {game.solution}
		</div>
	)
}

export default App
