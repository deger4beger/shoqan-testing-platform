import React, { useState } from "react"
import { observer } from "mobx-react"
import { Button, Heading, InfoSignIcon, Pane } from "evergreen-ui"
import { Question } from "../../../../../types"
import QuestionComponent from "../../../../components/reusable/Question"
import { useStores } from "../../../../../lib/mobx"
import { notify } from "../../../helpers"

const Psychology: React.FC = () => {

	const { testStore } = useStores()
	const { psychologyTest: test } = testStore

	const [selected, setSelected] = useState<string[]>([...Array(test!.length)])

	const onSetSelected = (id: number, value: string) => {
		const newSelected = [...selected]
		newSelected[id] = value
		setSelected(newSelected)
	}

	const onSubmitTest = async () => {
		await testStore.postStressData({
			answers: selected
		})
		if (!testStore.states.errors.stressPost) {
			notify(
				"Уровень вашей стрессоустойчивости появится в личном кабинете",
				"success",
				8,
				"Тест успешно сдан !"
			)
		}
	}

	return (
		<Pane width="100%" display="flex" alignItems="center" flexDirection="column">
			<Heading size={600} borderBottom="2px solid #c1c4d6" paddingBottom={6}>
  			<InfoSignIcon color="info" marginRight={16} />
  			Пройдите психологический тест, чтобы продолжить дальше
  		</Heading >
  		<Pane display="flex" width="60%" flexWrap="wrap" marginTop={30}>
	  		{ test!.map((elem, index) => {
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
  		<Button
  				appearance="primary"
  				size="large"
  				marginTop={40}
  				marginBottom={100}
  				onClick={onSubmitTest}
  				isLoading={testStore.states.loading.stressPost}
  				disabled={selected.some(el => !el)}
  			>
  			Завершить тест
  		</Button>
		</Pane>
	)
}

export default observer(Psychology)