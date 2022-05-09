import React from "react"
import { Pane } from "evergreen-ui"

interface CompetenceCardProps {
	title: string
}

const CompetenceCard: React.FC<CompetenceCardProps> = ({
	title
}) => {
	return (
		<Pane
				background="gray100"
				border={true}
				paddingY={10}
				paddingX={16}
				marginY={10}
				marginX={10}
				width={360}
			>
			{ title }
		</Pane>
	)
}

export default CompetenceCard