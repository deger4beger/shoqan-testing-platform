import React from "react"
import { Pane, Heading } from "evergreen-ui"

const NotFound = () => {
  return (
  	<Pane
  		width="100vw"
  		height="100vh"
  		display="flex"
  		justifyContent="center"
  		alignItems="center"
  	>
  		<Heading size={900}>
  			Страница не найдена
  		</Heading>
  	</Pane>
  );
}

export default NotFound