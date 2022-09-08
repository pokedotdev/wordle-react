import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '~/App'
import '@fontsource/roboto/latin.css'
import 'tailwindcss/tailwind.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
