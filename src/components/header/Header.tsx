import { InfoModal, StatsModal } from '~/components'

export const Header = () => {
	return (
		<header className="relative my-20 flex h-20 items-center justify-between rounded-2xl bg-gray-1 px-5">
			<InfoModal />
			<h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40px] font-semibold tracking-wider text-[#202537]">
				WORDLE
			</h1>
			<div className="flex items-center gap-2">
				<StatsModal />
				<div className="h-[30px] w-16 rounded-full bg-gray-900"></div>
			</div>
		</header>
	)
}
