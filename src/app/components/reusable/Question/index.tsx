import React from "react"
import { Heading, Pane, RadioGroup } from "evergreen-ui"

interface QuestionProps {
	id: number
	question: string
	answers: string[]
	selected: string | undefined
	setSelected: (id: number, value: string) => void
}

const Question: React.FC<QuestionProps> = ({
	id,
	question,
	answers,
	selected,
	setSelected
}) => {
	return (
		<Pane
				flexBasis="50%"
				paddingLeft={70}
				marginTop={30}
				paddingBottom={30}
				borderBottom="1px solid #c1c4d6"
			>
			<RadioGroup
	      label={question}
	      size={16}
	      value={selected as any}
	      isRequired
	      options={[
	      	{
	      		label: "--",
	      		value: "",
	      		isDisabled: true
	      	},
	      	...answers.map(el => ({
	      		label: el,
	      		value: el
	      	}))
	      ]}
	      onChange={event => setSelected(id, event.target.value)}
	    />
		</Pane>
	)
}

export default Question