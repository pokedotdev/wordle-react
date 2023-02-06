type SVGProps = React.ComponentProps<'svg'>

export const ChartIcon = (props: SVGProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="40"
		height="36"
		viewBox="0 0 40 36"
		{...props}
	>
		<rect width="29.613" height="24" x="4.935" y="6" rx="2"></rect>
		<path
			className="stroke-white dark:stroke-gray-7"
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="1.4"
			d="M13.161 15v9M19.742 18v6M26.323 12v12"
		></path>
	</svg>
)

export const QuestionIcon = (props: SVGProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="27"
		height="27"
		fill="none"
		viewBox="0 0 27 27"
		{...props}
	>
		<g clipPath="url(#clip0_7_1572)">
			<path d="M27 13.5a13.5 13.5 0 11-27 0 13.5 13.5 0 0127 0zM9.274 10.18h1.393c.233 0 .418-.19.449-.421.151-1.107.91-1.914 2.264-1.914 1.158 0 2.218.579 2.218 1.971 0 1.072-.632 1.564-1.629 2.314-1.136.825-2.035 1.788-1.97 3.353l.004.366a.422.422 0 00.422.415h1.369a.422.422 0 00.421-.422v-.177c0-1.212.461-1.564 1.705-2.508 1.028-.78 2.1-1.648 2.1-3.47 0-2.549-2.154-3.78-4.512-3.78-2.138 0-4.48.995-4.64 3.857a.4.4 0 00.406.417zm3.924 10.873c1.03 0 1.736-.665 1.736-1.564 0-.932-.708-1.586-1.736-1.586-.986 0-1.703.654-1.703 1.586 0 .9.717 1.564 1.705 1.564h-.002z"></path>
		</g>
		<defs>
			<clipPath id="clip0_7_1572">
				<path fill="#fff" d="M0 0H27V27H0z"></path>
			</clipPath>
		</defs>
	</svg>
)

export const BackspaceIcon = (props: SVGProps) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="23"
		height="17"
		viewBox="0 0 23 17"
		{...props}
	>
		<path
			d="M9.94968 4.31639L13.587 7.78048L17.2243 4.31639L18.3244 5.47152L14.7435 8.88191L18.3244 12.2923L17.2243 13.4474L13.587 9.98334L9.94968 13.4474L8.84955 12.2923L12.4305 8.88191L8.84955 5.47152L9.94968 4.31639Z"
			fill="currentColor"
		/>
		<path
			fill-rule="evenodd"
			clip-rule="evenodd"
			d="M6.68607 0.906006C6.39072 0.906006 6.1119 1.04237 5.93057 1.27551L0.47151 8.2943C0.202693 8.63992 0.202694 9.1239 0.47151 9.46952L5.93057 16.4883C6.1119 16.7214 6.39071 16.8578 6.68607 16.8578H21.6027C22.1313 16.8578 22.5599 16.4293 22.5599 15.9007V1.86311C22.5599 1.33451 22.1313 0.906006 21.6027 0.906006H6.68607ZM2.03536 8.88191L6.99814 2.50119H20.9647V15.2626H6.99814L2.03536 8.88191Z"
			fill="currentColor"
		/>
	</svg>
)
