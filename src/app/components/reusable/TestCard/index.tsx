import React, { useState } from "react"
import {
	ArrowRightIcon,
	BanCircleIcon,
	Button,
	Code,
	Dialog, Heading, Pane,
	Strong,
	TickCircleIcon
} from "evergreen-ui"

interface TestCardProps {
	id: string
	onClick: (id: string) => void
	title: string
	passed: null | boolean
	attempts: null | number
}

const TestCard: React.FC<TestCardProps> = ({
	id,
	onClick,
	title,
	passed,
	attempts
}) => {

	const [isDialogShown, setIsDialogShown] = useState(false)

	const onConfirm = (close) => {
		onClick(id)
		close()
	}

	return (
		<Button
				width="100%"
				paddingX={20}
				paddingY={22}
				marginTop={16}
				display="flex"
				alignItems="center"
				justifyContent="flex-start"
				onClick={() => setIsDialogShown(true)}
				disabled={passed !== null || attempts === 3}
			>
			<Pane display="flex" alignItems="center">
				{ passed === null && <ArrowRightIcon marginRight={16} /> }
				{ passed === false && <BanCircleIcon marginRight={16} /> }
				{ passed && <TickCircleIcon marginRight={16} /> }
				<Strong>{ title }</Strong>
				<Heading size={200} marginLeft={10}>
	    		{ `(${!attempts ? 0 : attempts} / 3 попыток)` }
	  		</Heading>
			</Pane>
			<Dialog
        isShown={isDialogShown}
        title="Подтверждение"
        onCloseComplete={() => setIsDialogShown(false)}
        onConfirm={onConfirm}
        confirmLabel="Да"
      >
				Начать тестирование <Code>{title}</Code> ?
      </Dialog>
		</Button>
	)
}

export default TestCard