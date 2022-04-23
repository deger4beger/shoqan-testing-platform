import React from "react"
import { Pane, Strong } from "evergreen-ui"

const Footer = () => {
	return (
		<Pane
			width="100%"
			background="gray200"
     	display="flex"
     	alignItems="center"
     	justifyContent="center"
     	height="30px"
     	borderTop={true}
      borderWidth={1}
      zIndex={10}
      borderColor="#C4C4C4"
    >
			<Strong size={300}>© 2022 · Shoqan-testing-platform</Strong>
		</Pane>
	)
}

export default Footer