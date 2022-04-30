import React, { useEffect } from "react"
import { Heading, Pane, SegmentedControl } from "evergreen-ui"
import { observer } from "mobx-react"
import { Discipline } from "../../../../../types"
import Preloader from "../../../../components/reusable/Preloader"
import TestCard from "../../../../components/reusable/TestCard"
import { useStores } from "../../../../../lib/mobx"

const Common = () => {
	const [options] = React.useState(Object.values(Discipline).map(el => ({
		label: el,
		value: el
	})))
  const [value, setValue] = React.useState<Discipline>(Discipline.ONE)

  const { testStore } = useStores()

  useEffect(() => {
  	testStore.getTestsForDiscipline({
  		discipline: value
  	})
  }, [value])

  const isLoading = testStore.states.loading.testsForDisc
  const onTestClick = (id: string) => {
  	console.log(id)
  }

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
  		disabled={isLoading}
  	/>
  	{ testStore.testsForDiscipline !== null && <Pane marginTop={36}>
	  	{ !isLoading && testStore
	  		.testsForDiscipline?.map(test => {
		  		return <TestCard
		  			key={test.filename}
		  			id={test.id}
		  			onClick={onTestClick}
		  			title={test.filename}
		  			passed={test.passed}
            attempts={test.attempts}
		  		/>
	  		}
	  	) }
	  	{ (!isLoading && !testStore.testsForDiscipline?.length) && <Pane textAlign="center" paddingTop={60}>
	  		Тестов для данной дисциплины еще нет
	  	</Pane> }
  	</Pane> }
  	{ (isLoading || testStore.testsForDiscipline === null) && <Preloader /> }
  </Pane>
}

export default observer(Common)