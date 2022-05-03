import { useEffect, useRef, useState } from "react"

const useTimer = (seconds: number) => {

	const [timerStarted, setTimerStarted] = useState(false)
	const [secondsLeft, setSecondsLeft] = useState<number>(seconds)
	const intervalRef = useRef<null | NodeJS.Timer>(null)

	useEffect(() => {
		if (!timerStarted) return
		intervalRef.current = setInterval(() => {
			setSecondsLeft(prev => prev - 1)
		}, 1000)
		return () => {
			clearInterval(intervalRef.current!)
		}
	}, [timerStarted])

	useEffect(() => {
		if (!timerStarted) return
    if (secondsLeft <= 0) {
      clearInterval(intervalRef.current!)
    }
  }, [secondsLeft, timerStarted])

  return {
  	secondsLeft,
  	setTimerStarted
  }

}

export default useTimer