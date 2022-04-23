import React, { useEffect } from 'react'
import { Heading, Pane, WarningSignIcon } from "evergreen-ui"
import { withProfile } from "../../../hocs/withProfile"
import { useStores } from "../../../../lib/mobx"

const MyStudy = () => {

	const { testStore } = useStores()

	useEffect(() => {
		testStore.getStressData()
	}, [])

	return (
		<Pane width="100%" display="flex" justifyContent="center">
			<Heading size={700} borderBottom="1px solid black" paddingBottom={6}>
  			<WarningSignIcon color="warning" marginRight={16} />
  			Пройдите психологический мини-тест, чтобы продолжить дальше
  		</Heading>
		</Pane>
	)
}

export default withProfile(MyStudy)