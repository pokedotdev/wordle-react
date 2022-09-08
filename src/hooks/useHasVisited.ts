import * as React from 'react'

export const useHasVisited = () => {
	const hasVisited = !!localStorage.getItem('hasVisited')

	React.useLayoutEffect(() => {
		if (!hasVisited) localStorage.setItem('hasVisited', 'true')
	}, [])

	return hasVisited
}
