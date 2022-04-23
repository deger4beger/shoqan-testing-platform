import React from 'react'
import { Pane } from "evergreen-ui"
import { withProfile } from "../../../hocs/withProfile"

const MyStudy = () => {
	return (
		<Pane width="100%" display="flex" justifyContent="center">
			Прохождение тестов
		</Pane>
	)
}

export default withProfile(MyStudy)