import { Board, Header } from '~/components'
import { GameProvider } from '~/Game'

function App() {
	return (
		<div className="mx-auto max-w-screen-sm">
			<GameProvider>
				<Header />
				<main className="flex flex-col items-center">
					<Board />
					<div className="w-full bg-black">asdfsdf</div>
				</main>
			</GameProvider>
		</div>
	)
}

export default App
