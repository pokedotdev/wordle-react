const theme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Roboto', ...theme.fontFamily.sans],
			},
			colors: {
				gray: {
					1: '#F3F3F3',
					2: '#DADCE0',
					3: '#D3D6DA',
					4: '#939B9F',
					5: '#818181',
				},
				darkgray: {},
				green: {
					1: '#6AAA64',
					2: '#66A060',
				},
				yellow: {
					1: '#CEB02C',
				},
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
