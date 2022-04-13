import React, {useState} from "react"
import {Button, Pane, SelectMenu, SendMessageIcon, TextInputField, Heading, WarningSignIcon } from "evergreen-ui"

const UserCabinet = () => {

  const [fullName, setFullName] = useState("")
  const onFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.currentTarget.value)
  }

  return (
    <>
      <Pane
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
      	<Pane width={480}>
      		<Pane>
		      	<Heading size={700} borderBottom="1px solid black" paddingBottom={6}>
		      		<WarningSignIcon color="warning" marginRight={16} />
		      		Заполните анкету, чтобы продолжить дальше:
		      	</Heading>
	      	</Pane>
	        <TextInputField
	          label="ФИО"
	          placeholder="Введите ФИО"
	          width="100%"
	          marginTop={30}
	          onChange={onFullNameChange} value={fullName}
	        />

	        <SelectMenu
	          hasTitle={false}
	          options={[
	            "Apple", "Apricot",
	            "Banana", "Cherry",
	            "Cucumber"]
	            .map(
	              (label) => ({label, value: label})
	            )}
	        >
	          <Button width="100%">
	            Выберите ВУЗ . . .
	          </Button>
	        </SelectMenu>
	        <br/>
	        <SelectMenu
	          hasTitle={false}
	          options={[
	            "Apple", "Apricot",
	            "Banana", "Cherry",
	            "Cucumber"]
	            .map(
	              (label) => ({label, value: label})
	            )}
	        >
	          <Button width="100%" marginTop={20}>
	            Выберите специальность . . .
	          </Button>
	        </SelectMenu>
	        <br/>
	        <SelectMenu
	          hasFilter={false}
	          hasTitle={false}
	          options={["1","2","3","4"]
	            .map(
	              (label) => ({label, value: label})
	            )}
	        >
	          <Button width="100%" marginTop={20}>
	            Выберите курс . . .
	          </Button>
	        </SelectMenu>
	        <Button width="100%" marginTop={30} appearance="primary" intent="success">
	        	<SendMessageIcon marginRight={16} />
	        	Отправить данные
	        </Button>
        </Pane>
      </Pane>
    </>
  )
}

export default UserCabinet