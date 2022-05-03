import React from "react"
import { Strong } from "evergreen-ui"

interface TimerProps {
	secondsLeft: number
}

const Timer: React.FC<TimerProps> = ({
	secondsLeft
}) => {
	return (
		<Strong size={700}>{
        secondsLeft < 60 ?
      (
        `00:${secondsLeft % 60 < 10 ? "0" : ""}${secondsLeft}`
      ) : (
        secondsLeft < 600
      ) ? (
        `0${Math.floor(secondsLeft / 60)}:${secondsLeft % 60 < 10 ? "0" : ""}${secondsLeft % 60}`
      ) : (
        `${Math.floor(secondsLeft / 60)}:${secondsLeft % 60 < 10 ? "0" : ""}${secondsLeft % 60}`
      )
    }</Strong>
	)
}

export default Timer