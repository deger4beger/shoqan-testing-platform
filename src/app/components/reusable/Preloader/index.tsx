import React from "react"
import { Heading, Pane, Spinner } from "evergreen-ui"

const Preloader = () => {
	return (
		<Pane display="flex" justifyContent="center" marginTop={200}>
			<Spinner />
		</Pane>
	)
}

export default Preloader