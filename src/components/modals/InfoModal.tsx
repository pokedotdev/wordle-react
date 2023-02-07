import * as React from 'react'
import { Modal, QuestionIcon, Guess } from '~/components'
import { useHasVisited } from '~/hooks'

export const InfoModal = () => {
	const state = React.useState<boolean | undefined>(!useHasVisited())

	return (
		<Modal
			state={state}
			buttonText="¡JUGAR!"
			trigger={
				<QuestionIcon className="h-8 fill-gray-5 dark:fill-gray-2 sm:h-10" />
			}
		>
			<div className="prose prose-lg my-12 px-10 dark:prose-invert dark:text-white">
				<h2 className="text-center text-4xl font-bold">Cómo jugar</h2>
				<p>Adivina la palabra oculta en cinco intentos.</p>
				<p>Cada intento debe ser una palabra válida de 5 letras.</p>
				<p>
					Después de cada intento el color de las letras cambia para mostrar qué
					tan cerca estás de acertar la palabra.
				</p>
				<h4 className="bold">Ejemplos</h4>
				<div className="flex justify-center">
					<Guess
						guess={[
							{ value: 'G', status: 'correct' },
							{ value: 'A', status: 'empty' },
							{ value: 'T', status: 'empty' },
							{ value: 'O', status: 'empty' },
							{ value: 'S', status: 'empty' },
						]}
						isExample
					/>
				</div>
				<p>
					La letra <b>G</b> está en la palabra y en la posición correcta.
				</p>
				<div className="flex justify-center">
					<Guess
						guess={[
							{ value: 'V', status: 'empty' },
							{ value: 'O', status: 'empty' },
							{ value: 'C', status: 'present' },
							{ value: 'A', status: 'empty' },
							{ value: 'L', status: 'empty' },
						]}
						isExample
					/>
				</div>
				<p>
					La letra <b>C</b> está en la palabra pero en la posición incorrecta.
				</p>
				<div className="flex justify-center">
					<Guess
						guess={[
							{ value: 'C', status: 'empty' },
							{ value: 'A', status: 'empty' },
							{ value: 'N', status: 'empty' },
							{ value: 'T', status: 'empty' },
							{ value: 'O', status: 'absent' },
						]}
						isExample
					/>
				</div>
				<p>
					La letra <b>O</b> no está en la palabra.
				</p>
				<p>
					Puede haber letras repetidas. Las pistas son independientes para cada
					letra.
				</p>
				<p className="text-center">¡Una palabra nueva cada 5 minutos!</p>
			</div>
		</Modal>
	)
}
