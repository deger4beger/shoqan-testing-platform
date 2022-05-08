import React, { useState } from "react"
import { observer } from "mobx-react"
import { useStores } from "../../../../../lib/mobx"
import { Pane } from "evergreen-ui"
import ControlPanel from "../../../../components/singletone/ControlPanel"
import Test from "../../../../components/reusable/Test"
import Pagination from "../../../../components/reusable/Pagination"
import useTimer from "../../../../hooks/useTimer"

const Testing = () => {

	const { passingStore } = useStores()

  const [pages] = useState(Array.from({length: 30}, (_, i) => i + 1))
	const [selectedPage, setSelectedPage] = useState(1)

  const [answers, setAnswers] = useState<string[]>(new Array(30).fill(null))
  const [currentAnswers, setCurrentAnswers] = useState<string[]>([])

	const [isTestStarted, setIsTestStarted] = useState(false)
  const { secondsLeft, setTimerStarted } = useTimer(1800)

	const onStartTest = async () => {
		await passingStore.getTestToPass()
		setCurrentAnswers(passingStore.testToPass![0].answers)
    setIsTestStarted(true)
    setTimerStarted(true)
  }

  const onPageChange = (page: number) => {
  	setSelectedPage(page)
  	setCurrentAnswers(passingStore.testToPass![page - 1].answers)
  }

  const onAnswerSelect = (index: number) => {
  	const copyAnswers = [...answers]
  	copyAnswers[selectedPage - 1] = passingStore.testToPass![selectedPage - 1].answers[index]
  	setAnswers(copyAnswers)
  }

  const onFinishTest = () => {
    passingStore.passTest({ answers })
  }

	return (
		<Pane
				width="60%"
      	display="flex"
      	flexDirection="column"
     		alignItems="center"
      	margin="auto"
      >
      	<ControlPanel
	      	isAbleToEnd={answers.every(el => !!el) && answers.length === 30}
      		isTestStarted={isTestStarted}
	      	onStartTest={onStartTest}
	      	onFinishTest={onFinishTest}
	      	secondsLeft={secondsLeft}
	      	isTestLoading={passingStore.states.loading.getTest}
          isPassTestLoading={passingStore.states.loading.passTest}
      	/>
      	{ isTestStarted && <Pane
      			display="flex"
      			flexDirection="column"
      			justifyContent="space-around"
      			height="100%"
      		>
	      	<Pane marginTop={30} width="100%">
	      		<Test
	      			questionNumber={selectedPage}
	      			question={passingStore.testToPass![selectedPage - 1].question}
  						answers={passingStore.testToPass![selectedPage - 1].answers}
  						setSelectedAnswer={onAnswerSelect}
  						selectedAnswerIndex={passingStore.testToPass![selectedPage - 1].answers.indexOf(answers[selectedPage - 1])}
	      		/>
	      	</Pane>
	      	<Pane marginTop={10} paddingTop={16} marginBottom={30} borderTop="1px dashed #c1c4d6">
		      	<Pagination
		      		pages={pages}
		      		selectedList={answers}
		      		selectedPage={selectedPage}
		      		setSelectedPage={(page) => onPageChange(page)}
		      	/>
	      	</Pane>
      	</Pane> }
		</Pane>
	)
}

export default observer(Testing)