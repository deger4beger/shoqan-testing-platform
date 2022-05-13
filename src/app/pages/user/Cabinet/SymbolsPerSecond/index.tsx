import React, { useEffect, useState } from "react"
import { Heading, Pane, TextInputField } from "evergreen-ui"
import { words } from "../../../../../lib/structures"
import { getRandom } from "../../../../helpers"
import useTimer from "../../../../hooks/useTimer"

interface SymbolsPerSecondProps {
	onSetSPS: (number) => void
}

const SymbolsPerSecond: React.FC<SymbolsPerSecondProps> = ({
	onSetSPS
}) => {

	const [wordsForTest] = useState(getRandom(words, 10))
	const [wordsString, setWordsString] = useState("")
	const [inputDisabled, setInputDisabled] = useState(false)
	const { secondsLeft, setTimerStarted } = useTimer(500)

	useEffect(() => {
		if (!!wordsString.length) {
			setTimerStarted(true)
		}
	}, [wordsString])

	const onSetWordsString = (e: React.ChangeEvent<HTMLInputElement>) => {
		const currentString = e.target.value
		if (wordsForTest.join(" ").slice(0, currentString.length) !== currentString) {
			return
		}
		setWordsString(prev => currentString)
		if (wordsForTest.join(" ").length === currentString.length) {
			setInputDisabled(true)
			onSetSPS(Math.round(wordsString.length / (500 - secondsLeft)))
			return
		}
	}

	return (
		<Pane marginTop={20}>
			<Pane
					marginBottom={6}
					textAlign="center"
					borderTop={true}
					paddingTop={16}
					paddingBottom={6}
					borderBottom={true}
				>
				<Heading>
					Пройдите тест на скорость печати
				</Heading>
			</Pane>
			<Pane
					display="flex"
					flexWrap="wrap"
					justifyContent="center"
					marginTop={20}
					border="2px solid #c1c4d6"
					borderRadius={6}
				>
				{ wordsForTest.map(word =>
					<Pane paddingX={8} paddingY={2} key={word}>
						{ word }
					</Pane>
				) }
			</Pane>
			<TextInputField
        label="Введите слова выше в том же порядке"
        description="Отсчет времени начнется при начале печати"
        placeholder="..."
        width="100%"
        marginTop={30}
        onChange={onSetWordsString}
        value={wordsString}
        disabled={inputDisabled}
      />
		</Pane>
	)
}

export default SymbolsPerSecond