import * as React from 'react'

export const useWindow = (eventName: keyof WindowEventMap, callback: any) => {
	React.useEffect(() => {
		window.addEventListener(eventName, callback)
		return () => {
			window.removeEventListener(eventName, callback)
		}
	})
}
