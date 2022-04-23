import React, { useState } from 'react'
import { Heading, Pane, WarningSignIcon } from "evergreen-ui"
import { Question } from "../../../../../types"
import QuestionComponent from "../../../../components/reusable/Question"

interface PsychologyProps {
	test: Question[]
}

const Psychology: React.FC<PsychologyProps> = ({ test }) => {

	const [selected, setSelected] = useState<string[]>([...Array(test.length - 1)])

	const onSetSelected = (id: number, value: string) => {
		const newSelected = [...selected]
		newSelected[id] = value
		setSelected(newSelected)
	}

	return (
		<Pane width="100%" display="flex" alignItems="center" flexDirection="column">
			<Heading size={600} borderBottom="2px solid #c1c4d6" paddingBottom={6}>
  			<WarningSignIcon color="warning" marginRight={16} />
  			Пройдите психологический мини-тест, чтобы продолжить дальше
  		</Heading >
  		<Pane display="flex" width="60%" flexWrap="wrap" marginTop={30}>
	  		{ test.map((elem, index) => {
	  			return <QuestionComponent
	  				key={index}
	  				id={index}
						question={elem.question}
						answers={elem.answers}
						selected={selected[index]}
						setSelected={onSetSelected}
	  			/>
	  		}) }
  		</Pane>
		</Pane>
	)
}

export default Psychology