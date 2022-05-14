import React from "react"
import { Heading, Pane } from "evergreen-ui"

interface TitleProps {
	icon?: React.ReactElement
	description?: string
	title: string
}

const Title: React.FC<TitleProps> = ({
	icon,
	description,
	title
}) => {
	return (
		<Pane marginBottom={50} display="flex" flexDirection="column" alignItems="center">
      <Heading size={600} borderBottom="2px solid #c1c4d6" paddingX={20} paddingBottom={4}>
        { icon && icon }{ title }
      </Heading>
      { description && <Heading size={200} marginTop={8}>
        { description }
      </Heading> }
    </Pane>
	)
}

export default Title