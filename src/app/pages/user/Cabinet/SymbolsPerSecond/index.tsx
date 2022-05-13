import React, { useState } from "react"
import { Heading, Pane, TextInputField } from "evergreen-ui"
import { words } from "../../../../../lib/structures"
import { getRandom } from "../../../../helpers"

const SymbolsPerSecond = () => {

	const [wordsString, setWordsString] = useState("")

	const onSetWordsString = (e: React.ChangeEvent<HTMLInputElement>) => {
		setWordsString(e.target.value)
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
				{ getRandom(words, 10).map(word =>
					<Pane paddingX={8} paddingY={2}>
						{ word }
					</Pane>
				) }
			</Pane>
			<TextInputField
        label="Введите слова выше, через пробел, в том же порядке"
        placeholder="..."
        width="100%"
        marginTop={30}
        onChange={onSetWordsString}
        value={wordsString}
      />
		</Pane>
	)
}

export default SymbolsPerSecond