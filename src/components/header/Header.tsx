import { DarkModeSwitch, InfoModal, StatsModal } from '~/components'

export const Header = () => {
	return (
		<header className="relative mb-20 mt-10 flex h-20 items-center justify-between rounded-2xl bg-gray-1 px-5 dark:bg-gray-3/5">
			<InfoModal />
			<h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-[40px] font-semibold tracking-wider text-gray-8 dark:text-gray-2">
				WORDLE
			</h1>
			<div className="flex items-center gap-2">
				<StatsModal />
				<DarkModeSwitch />
			</div>
		</header>
	)
}
