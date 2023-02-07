import * as React from 'react'
import { ChartIcon, Modal } from '~/components'
import { useGameStore } from '~/store'
import { addLeadingZeros, formatClock } from '~/utils'

export const StatsModal = () => {
	const status = useGameStore((state) => state.status)
	const plays = useGameStore((state) => state.plays)
	const wins = useGameStore((state) => state.wins)
	const solution = useGameStore((state) => state.solution)
	const state = React.useState<boolean>()
	const [_, setOpen] = state

	React.useEffect(() => {
		if (status !== 'playing') setOpen(true)
	}, [status])

	return (
		<Modal
			state={state}
			buttonText="Aceptar"
			trigger={
				<ChartIcon className="h-8 fill-gray-5 dark:fill-white sm:h-10" />
			}
		>
			<div className="my-12 flex flex-col items-center px-10 text-xl">
				<h2 className="text-center text-4xl font-bold">Estadísticas</h2>
				<div className="my-12 flex justify-between self-stretch sm:px-20">
					<div className="flex flex-col items-center">
						<div className="text-4xl font-extrabold">{plays}</div>
						<div>Jugadas</div>
					</div>
					<div className="flex flex-col items-center">
						<div className="text-4xl font-extrabold">{wins}</div>
						<div>Victorias</div>
					</div>
				</div>
				{status === 'lost' && (
					<div className="mb-10">
						La palabra era: <b>{solution}</b>
					</div>
				)}
				<div>SIGUIENTE PALABRA</div>
				<Countdown />
			</div>
		</Modal>
	)
}

export const Countdown = () => {
	const countdown = formatClock(useGameStore((state) => state.countdown))
	return (
		<div className="text-2xl font-bold">
			{countdown.minutes}:{addLeadingZeros(countdown.seconds, 2)}
		</div>
	)
}
