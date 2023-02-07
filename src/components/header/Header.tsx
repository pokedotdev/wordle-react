import { DarkModeSwitch, InfoModal, StatsModal } from '~/components'

export const Header = () => {
	return (
		<header className="relative mb-12 mt-10 flex h-16 items-center justify-between rounded-2xl bg-gray-1 px-4 dark:bg-gray-3/5 sm:my-20 sm:h-20 sm:px-5">
			<InfoModal />
			<h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-semibold tracking-wider text-gray-8 dark:text-gray-2 sm:text-[40px]">
				WORDLE
			</h1>
			<div className="flex items-center gap-1 sm:gap-2">
				<StatsModal />
				<DarkModeSwitch />
			</div>
		</header>
	)
}
