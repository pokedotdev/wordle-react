import cn from 'clsx'
import { LetterData } from '~/types'

type LetterProps = {
	isExample?: boolean
} & LetterData

export const Letter = ({
	status = 'empty',
	value,
	isExample = false,
}: LetterProps) => {
	const classes = isExample
		? cn(ExampleLetterStyles.base, ExampleLetterStyles.status[status])
		: cn(LetterStyles.base, status && LetterStyles.status[status])

	return <div className={classes}>{value}</div>
}

const LetterStyles = {
	base: 'grid place-items-center h-14 sm:h-20 aspect-square text-4xl text-white font-extrabold rounded-lg',
	status: {
		empty: 'bg-gray-4/30 text-black dark:text-white dark:bg-gray-4/20',
		absent: 'bg-gray-4',
		present: 'bg-yellow-1',
		correct: 'bg-green-2',
	},
} as const

const ExampleLetterStyles = {
	base: 'grid place-items-center h-14 sm:h-20 aspect-square text-4xl text-black dark:text-white font-extrabold rounded-lg',
	status: {
		...LetterStyles.status,
		empty:
			'bg-white border border-black dark:border-gray-4 dark:bg-gray-7 dark:text-white',
	},
} as const
