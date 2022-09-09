import * as React from 'react'

export const useCountdown = (targetDate: Date) => {
	const countDownDate = new Date(targetDate).getTime()

	const [countDown, setCountDown] = React.useState(
		countDownDate - new Date().getTime()
	)

	React.useEffect(() => {
		const interval = setInterval(() => {
			setCountDown(countDownDate - new Date().getTime())
		}, 1000)

		return () => clearInterval(interval)
	}, [countDownDate])

	return { time: getReturnValues(countDown), expired: countDown < 1 }
}

const getReturnValues = (countDown: number) => {
	const days = Math.floor(countDown / (1000 * 60 * 60 * 24))
	const hours = Math.floor(
		(countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	)
	const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60))
	const seconds = Math.floor((countDown % (1000 * 60)) / 1000)

	return { days, hours, minutes, seconds }
}
