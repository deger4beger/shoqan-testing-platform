import React, { useEffect } from 'react'
import { Heading, Pane, SegmentedControl } from "evergreen-ui"
import { Discipline } from "../../../../../types"

const Common = () => {
	const [options] = React.useState(Object.values(Discipline).map(el => ({
		label: el,
		value: el
	})))
  const [value, setValue] = React.useState(Discipline.ONE)

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
  	/>
  </Pane>
}

export default Common