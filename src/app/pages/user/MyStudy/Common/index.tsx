import React, { useEffect } from 'react'
import { Heading, Pane, SegmentedControl } from "evergreen-ui"
import { Discipline } from "../../../../../types"
import Preloader from "../../../../components/reusable/Preloader"
import TestCard from "../../../../components/reusable/TestCard"

const Common = () => {
	const [options] = React.useState(Object.values(Discipline).map(el => ({
		label: el,
		value: el
	})))
  const [value, setValue] = React.useState(Discipline.ONE)

  const tests = [
  	{
  		filename: "Тестирование по дисциплине аэродинамика 2 курс",
  		competencies: ["Компетенция 1", "Компетенция 2"],
  		passed: true
  	},
  	{
  		filename: "Тестирование по дисциплине аэродинамика 2 курс",
  		competencies: ["Компетенция 1", "Компетенция 2"],
  		passed: true
  	},
  	{
  		filename: "Тестирование по дисциплине аэродинамика 2 курс",
  		competencies: ["Компетенция 1", "Компетенция 2"],
  		passed: false
  	}
  ]

  useEffect(() => {
  	console.log(value)
  }, [value])

  return <Pane width="60%" margin="auto">
  	<Pane marginBottom={30} textAlign="center">
			<Heading size={600} borderBottom="2px solid #c1c4d6" paddingX={20} paddingBottom={4}>
				Выберите тестирование по желаемой дисциплине
			</Heading>
		</Pane>
  	<SegmentedControl
  		options={options}
  		value={value}
  		onChange={(value) => setValue(value as any)}
  		paddingBottom={16}
  		borderBottom="1px dashed #c1c4d6"
  	/>
  	<Pane marginTop={36}>
	  	{ tests.sort(test => test.passed ? 1 : -1).map(test => {
	  		return <TestCard
	  			title={test.filename}
	  			list={test.competencies}
	  			disabled={test.passed}
	  		/>
	  	}) }
  	</Pane>
  	{ false && <Preloader /> }
  </Pane>
}

export default Common