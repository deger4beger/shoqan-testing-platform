import React from "react"
import {
	ArrowRightIcon, BanCircleIcon, Button,
	Card,
	Pane,
	Strong,
	TickCircleIcon
} from "evergreen-ui"

interface TestCardProps {
	id: string
	onClick: (id: string) => void
	title: string
	passed: null | boolean
}

const TestCard: React.FC<TestCardProps> = ({
	id,
	onClick,
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
				onClick={() => onClick(id)}
				disabled={passed !== null}
			>
			{ passed === null && <ArrowRightIcon marginRight={16} /> }
			{ passed && <TickCircleIcon marginRight={16} /> }
			{ passed === false && <BanCircleIcon marginRight={16} /> }
			<Strong>{ title }</Strong>
		</Button>
	)
}

export default TestCard