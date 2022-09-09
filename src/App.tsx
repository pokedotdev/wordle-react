import { Board, Header, Keyboard } from '~/components'
import { GameProvider, useGame } from '~/Game'

function App() {
	const game = useGame()
	return (
		<div className="mx-auto max-w-screen-sm">
			<GameProvider>
				<Header />
				<main className="flex flex-col items-center">
					<Board />
					{/* <Keyboard /> */}
				</main>
				<div className="fixed bottom-0 right-0 bg-black px-2 text-white">
					{game.solution}
				</div>
			</GameProvider>
		</div>
	)
}

export default App
