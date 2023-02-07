import * as React from 'react'

export const DarkModeSwitch = () => {
	const isDarkMode = localStorage.theme === 'dark'
	const [darkMode, setDarkMode] = React.useState(isDarkMode)

	const toggleDarkMode = () => {
		const toggle = !darkMode
		setDarkMode(toggle)
		localStorage.theme = toggle ? 'dark' : 'light'
		if (toggle) {
			document.documentElement.classList.add('dark')
		} else {
			document.documentElement.classList.remove('dark')
		}
	}

	return (
		<button
			className="flex scale-90 cursor-pointer items-center overflow-hidden rounded-full sm:scale-100"
			style={{
				width: '60px',
				height: '30px',
				backgroundImage: `url("/img/switch-bg${darkMode ? '-dark' : ''}.svg")`,
				backgroundSize: 'cover',
				justifyContent: darkMode ? 'flex-start' : 'flex-end',
			}}
			onClick={toggleDarkMode}
		>
			<div className="translate-y-[1.2px] transition-all">
				<div
					className=""
					style={{
						width: '34px',
						height: '36px',
						backgroundImage: `url("/img/switch${darkMode ? '-dark' : ''}.svg")`,
					}}
				></div>
			</div>
		</button>
	)
}
