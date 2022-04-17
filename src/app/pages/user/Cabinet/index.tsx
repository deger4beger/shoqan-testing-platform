import React, {useState} from "react"
import {Button, Combobox, FilePicker, Pane, SelectMenu, SendMessageIcon, TextInputField, Heading, WarningSignIcon } from "evergreen-ui"
import { useStores } from "../../../../lib/mobx"

const UserCabinet = () => {

	const { userStore } = useStores()

  const [formData, setFormData] = useState({
  	fullname: "",
  	specialty: "",
  	course: ""
  })
  const [photo, setPhoto] = useState<null | FileList>(null)

  const onFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
    	...prev,
    	fullname: e.target.value
    }))
  }

  const setSelectedField = (item: any, fieldName: keyof typeof formData) => {
		setFormData(prev => ({
			...prev,
			[fieldName]: item
		}))
	}

	const onFormConfirm = () => {
		userStore.sendProfile({
			...formData,
			photo: (photo as FileList)[0]
		})
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
	          onChange={onFullNameChange}
	          value={formData.fullname}
	        />
	      	<Combobox
					  openOnFocus
					  items={["Корпоративные информационные системы"]}
					  onChange={selected => setSelectedField(selected, "specialty")}
					  placeholder="Специальность"
					  width="100%"
					  marginBottom={20}
					/>
					<Combobox
					  openOnFocus
					  items={['1', '2', '3', '4']}
					  onChange={selected => setSelectedField(selected, "course")}
					  placeholder="Курс"
					  width="100%"
					  marginBottom={20}
					/>
					<FilePicker
							width="100%"
							onChange={(photo) => setPhoto(photo)}
							placeholder="Фото"
							marginBottom={10}
						/>
	        <Button
	        		width="100%"
	        		marginTop={30}
	        		appearance="primary"
	        		intent="success"
	        		onClick={onFormConfirm}
	        	>
	        	<SendMessageIcon marginRight={16} />
	        	Отправить данные
	        </Button>
        </Pane>
      </Pane>
    </>
  )
}

export default UserCabinet