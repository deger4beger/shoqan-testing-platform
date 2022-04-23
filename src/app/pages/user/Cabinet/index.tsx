import React, { useEffect, useState} from "react"
import {
	Button,
	Combobox,
	FilePicker, Heading, Pane,
	SendMessageIcon, TextInputField,
	WarningSignIcon
} from "evergreen-ui"
import { useStores } from "../../../../lib/mobx"
import { observer } from "mobx-react"
import UserProfileFilled from "../../../components/singletone/UserProfileFilled"
import Preloader from "../../../components/reusable/Preloader"

const UserCabinet = () => {

	const { userStore } = useStores()

  const [formData, setFormData] = useState({
  	fullname: "",
  	specialty: "",
  	course: ""
  })
  const [photo, setPhoto] = useState<null | FileList>(null)

  const isBtnDisabled = Object.values(formData).some(el => !el) || !photo

  useEffect(() => {
  	if (!userStore.isInitialized) {
  		userStore.getCabinetData()
  	}
  	// return () => {
  	// 	userStore.setUserProfile(null, true)
  	// }
  }, [])

  const isFormDisabled = !!userStore.profile

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

	if (!userStore.isInitialized || userStore.states.loading.base) {
		return <Preloader />
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
    			{ !isFormDisabled ? (
    				<>
	    				<Pane>
			      		<Heading size={600} borderBottom="2px solid #c1c4d6" paddingBottom={6} textAlign="center">
			      			<WarningSignIcon color="warning" marginRight={16} />
			      			Заполните анкету, чтобы продолжить дальше
			      		</Heading>
		      		</Pane>
			      	<TextInputField
			          label="ФИО"
			          placeholder="Введите ФИО"
			          width="100%"
			          marginTop={30}
			          onChange={onFullNameChange}
			          value={formData.fullname}
			          disabled={isFormDisabled}
			        />
			      	<Combobox
							  openOnFocus
							  items={["Корпоративные информационные системы"]}
							  onChange={selected => setSelectedField(selected, "specialty")}
							  selectedItem={formData.specialty}
							  placeholder="Специальность"
							  width="100%"
							  marginBottom={20}
							  disabled={isFormDisabled}
							/>
							<Combobox
							  openOnFocus
							  items={['1', '2', '3', '4']}
							  onChange={selected => setSelectedField(selected, "course")}
							  selectedItem={formData.course}
							  placeholder="Курс"
							  width="100%"
							  marginBottom={20}
							  disabled={isFormDisabled}
							/>
							<FilePicker
									width="100%"
									onChange={(photo) => setPhoto(photo)}
									placeholder="Фото"
									marginBottom={10}
									disabled={isFormDisabled}
								/>
			        <Button
			        		width="100%"
			        		marginTop={30}
			        		appearance="primary"
			        		intent="success"
			        		onClick={onFormConfirm}
			        		disabled={isBtnDisabled}
			        		isLoading={userStore.states.loading.profile}
			        	>
			        	<SendMessageIcon marginRight={16} />
			        	Отправить данные
			        </Button>
		      </> ) : (
		      	<UserProfileFilled profile={userStore.profile as any} />
		      )}
		    </Pane>
      </Pane>
    </>
  )
}

export default observer(UserCabinet)