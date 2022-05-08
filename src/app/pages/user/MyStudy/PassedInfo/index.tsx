import React, { useEffect } from "react"
import { observer } from "mobx-react"
import { useStores } from "../../../../../lib/mobx"
import { ArrowLeftIcon, Button, Heading, InfoSignIcon, Pane, Strong } from "evergreen-ui"
import { useHistory } from "react-router-dom"

const PassedInfo = () => {

	const { passingStore } = useStores()
	const history = useHistory()

	const { passed, score } = passingStore.passedInfo!

	useEffect(() => {
		return () => {
			passingStore.resetAllData()
		}
	}, [])

	const onLeave = () => {
		passingStore.resetAllData()
		history.push("/study")
	}

	return (
		<Pane
				display="flex"
				flexDirection="column"
				justifyContent="center"
				alignItems="center"
				width="60%"
				margin="auto"
			>
			<Pane>
    		<Heading
    				size={600}
    				borderBottom="2px solid #c1c4d6"
    				paddingBottom={6}
    				paddingX={200}
    				textAlign="center"
    				marginTop={30}
    			>
    			<InfoSignIcon color={passed ? "success" : "danger"} marginRight={16} />
    			Итоги тестирования
    		</Heading>
  		</Pane>
  		<Pane marginTop={30} textAlign="center">
  			<Pane>
  				<Heading size={600} color={passed ? "#429777" : "#A73636"}>
  					{ passed ? "Вы успешно прошли тестирование" : "Вы не прошли тестирование" }
  				</Heading>
  			</Pane>
  			<Pane marginTop={10}>
  				<Heading size={600}>
	  				Количество баллов: { score }
	  			</Heading>
  			</Pane>
  		</Pane>
  		{ passed && (
  			<Pane
  					paddingTop={10}
  					marginTop={50}
  					paddingBottom={10}
  					paddingX={40}
  					textAlign="center"
  					borderTop={true}
  					borderBottom={true}
  				>
	  			<InfoSignIcon color="info" marginRight={16} size={12} />
	  			<Strong>
	  				Сертификат был отправлен на вашу почту
	  			</Strong>
	  		</Pane>
  		) }
  		<Button intent="none" size="large" iconBefore={ArrowLeftIcon} marginTop={30} onClick={onLeave}>
  			Выйти в меню
  		</Button>
		</Pane>
	)
}

export default observer(PassedInfo)