import React from "react"
import {
	ArrowRightIcon, BanCircleIcon, Button,
	Card,
	Pane,
	Strong,
	TickCircleIcon
} from "evergreen-ui"

interface TestCardProps {
	title: string
	passed: null | boolean
}

const TestCard: React.FC<TestCardProps> = ({
	title,
	passed
}) => {
	return (
		<Button
				width="100%"
				paddingX={20}
				paddingY={22}
				marginTop={16}
				display="flex"
				alignItems="center"
				justifyContent="flex-start"
				disabled={passed !== null}
			>
			{ passed === null && <ArrowRightIcon marginRight={16} /> }
			{ passed && <TickCircleIcon color="success" marginRight={16} /> }
			{ passed === false && <BanCircleIcon color="danger" marginRight={16} /> }
			<Strong>{ title }</Strong>
		</Button>
	)
}

export default TestCard