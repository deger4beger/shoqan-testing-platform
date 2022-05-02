import React, { useState } from "react"
import { observer } from "mobx-react"
import { useStores } from "../../../../../lib/mobx"
import { Pane } from "evergreen-ui"
import ControlPanel from "../../../../components/singletone/ControlPanel"
import Test from "../../../../components/reusable/Test"
import Pagination from "../../../../components/reusable/Pagination"

const Testing = () => {

	const [selectedPage, setSelectedPage] = React.useState(1)
	const [isTestStarted, setIsTestStarted] = useState(false)
  const [pages] = React.useState(Array.from({length: 30}, (_, i) => i + 1))
	const { passingStore } = useStores()

	return (
		<Pane
				width="60%"
      	display="flex"
      	flexDirection="column"
     		alignItems="center"
      	margin="auto"
      >
      	<ControlPanel
      		isTestStarted={isTestStarted}
	      	setIsTestStarted={setIsTestStarted}
      	/>
      	{ isTestStarted && <Pane
      			display="flex"
      			flexDirection="column"
      			justifyContent="space-around"
      			height="100%"
      		>
	      	<Pane marginTop={30} width="100%">
	      		<Test />
	      	</Pane>
	      	<Pane marginTop={10} paddingTop={16} marginBottom={30} borderTop="1px dashed #c1c4d6">
		      	<Pagination
		      		pages={pages}
		      		selectedPage={selectedPage}
		      		setSelectedPage={(page) => setSelectedPage(page)}
		      	/>
	      	</Pane>
      	</Pane> }
		</Pane>
	)
}

export default observer(Testing)