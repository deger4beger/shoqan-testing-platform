import React, {useState} from "react"
import {Button, Pane, SelectMenu, TextInputField} from "evergreen-ui";

const UserCabinet = () => {

  const [fullName, setFullName] = useState("")
  const onFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.currentTarget.value)
  }

  return (
    <>
      <Pane
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <TextInputField
          label="ФИО"
          placeholder="Введите ФИО"
          width={300}
          onChange={onFullNameChange} value={fullName}
        />
        <SelectMenu
          title="Выберите ВУЗ"
          hasTitle={false}
          options={[
            "Apple", "Apricot",
            "Banana", "Cherry",
            "Cucumber"]
            .map(
              (label) => ({label, value: label})
            )}
          itemHeight={40}
        >
          <Button width={300}>
            {"Выберите ВУЗ . . ."}
          </Button>
        </SelectMenu>
        <br/>
        <SelectMenu
          title="Выберите специальность"
          hasTitle={false}
          itemHeight={40}
          options={[
            "Apple", "Apricot",
            "Banana", "Cherry",
            "Cucumber"]
            .map(
              (label) => ({label, value: label})
            )}
        >
          <Button width={300}>
            {"Выберите специальность . . ."}
          </Button>
        </SelectMenu>
        <br/>
        <SelectMenu
          title="Выберите курс"
          hasFilter={false}
          hasTitle={false}
          itemHeight={40}
          options={["1","2","3","4"]
            .map(
              (label) => ({label, value: label})
            )}
        >
          <Button width={300}>
            {"Выберите курс . . ."}
          </Button>
        </SelectMenu>
      </Pane>
    </>
  )
}

export default UserCabinet