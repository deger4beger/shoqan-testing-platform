import React from "react"
import { Button, InfoSignIcon, Pane } from "evergreen-ui"
import Title from "../../../../../components/reusable/Title"

interface CompleteStagesProps {
	complete: () => void
}

const CompleteStages: React.FC<CompleteStagesProps> = ({
	complete
}) => {
	return (
		<Pane
			width="56%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="auto"
		>
			<Title
	      icon={ <InfoSignIcon color="success" marginRight={16} /> }
	      title="Все этапы верификации успешно пройдены"
	      description="Вы успешно подтвердили свою личность, переходите к сдаче теста"
	    />
			<Button
	        onClick={complete}
	        appearance="primary"
	        size="large"
	        intent="none"
	        marginTop={30}
	      >
	      Начать тестирование
	    </Button>
    </Pane>
	)
}

export default CompleteStages