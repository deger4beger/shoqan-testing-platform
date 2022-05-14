import React, { useEffect, useState } from "react"
import SymbolsPerSecond from "../../../../../components/reusable/SymbolsPerSecond"
import { Button, Heading, InfoSignIcon, Pane } from "evergreen-ui"
import Title from "../../../../../components/reusable/Title"
import { useStores } from "../../../../../../lib/mobx"
import { observer } from "mobx-react"

interface StageTwoProps {
	complete: () => void
}

const StageTwo: React.FC<StageTwoProps> = ({
	complete
}) => {

	const [SPS, setSPS] = useState(0)
	const [isVerified, setIsVerified] = useState<null | boolean>(null)

	const { userStore, passingStore } = useStores()

	useEffect(() => {
		if (SPS === 0) return
		const userSpeed = userStore.profile!.sps
		if (Math.abs(SPS - userSpeed) > 50) {
			setIsVerified(false)
		} else {
			setIsVerified(true)
		}
	}, [SPS])

	const restrictToPass = () => {
		passingStore.resetData()
	}

	return (
		<Pane
      width="56%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      margin="auto"
    >
    	<Title
	      icon={ <InfoSignIcon color="info" marginRight={16} /> }
	      title="Верификация #2"
	    />
    	<SymbolsPerSecond
				onSetSPS={(sps) => setSPS(sps)}
			/>
			{ (isVerified === true) && <Button
	        onClick={complete}
	        appearance="primary"
	        size="large"
	        intent="none"
	        marginTop={30}
	      >
	      Продолжить
	    </Button> }
	    { (isVerified === false) && <Heading color="red" marginTop={10}>
	    	Вы не прошли верификацию
	    </Heading> }
	    { (isVerified === false) && <Button
	        onClick={restrictToPass}
	        appearance="primary"
	        size="large"
	        intent="none"
	        marginTop={30}
	      >
	      Выйти
	    </Button> }
    </Pane>
	)
}

export default observer(StageTwo)