import * as React from 'react'
import { ChartIcon, Modal } from '~/components'
import { useGame } from '~/Game'

export const StatsModal = () => {
	const game = useGame()
	const state = React.useState<boolean>()
	const [_, setOpen] = state

	React.useEffect(() => {
		if (game.gameOver) setOpen(true)
	}, [game.gameOver])

	return (
		<Modal
			state={state}
			buttonText="Aceptar"
			trigger={<ChartIcon className="fill-gray-5" />}
		>
			<div className="my-12 flex flex-col items-center px-10 text-xl">
				<h2 className="text-center text-4xl font-bold">Estadísticas</h2>
				<div className="my-12 flex justify-between self-stretch px-20">
					<div className="flex flex-col items-center">
						<div className="text-4xl font-extrabold">{game.stats.plays}</div>
						<div>Jugadas</div>
					</div>
					<div className="flex flex-col items-center">
						<div className="text-4xl font-extrabold">{game.stats.wins}</div>
						<div>Victorias</div>
					</div>
				</div>
				<div className="mb-10">
					La palabra era: <b>PERRO</b>
				</div>
				<div>SIGUIENTE PALABRA</div>
				<div className="text-2xl font-bold">4:10</div>
			</div>
		</Modal>
	)
}
