import React from "react"
import {
	ArrowRightIcon,
	Button,
	Card,
	Pane,
	Strong,
	TickCircleIcon
} from "evergreen-ui"

interface TestCardProps {
	title: string
	list: string[]
	disabled: boolean
}

const TestCard: React.FC<TestCardProps> = ({
	title,
	list,
	disabled
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
				disabled={disabled}
			>
			{ !disabled && <ArrowRightIcon marginRight={16} /> }
			{ disabled && <TickCircleIcon color="success" marginRight={16} /> }
			<Strong>{ title }</Strong>
		</Button>
	)
}

export default TestCard