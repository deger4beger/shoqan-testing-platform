import React from "react"
import { Heading, Pane } from "evergreen-ui"

const Preloader = () => {
	return (
		<Pane textAlign="center" marginTop={200}>
			<Heading size={600}>
				Загрузка...
			</Heading>
		</Pane>
	)
}

export default Preloader