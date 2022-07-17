import React, { useEffect, useState } from "react"
import { TextInputField, LogInIcon, CornerDialog, Heading } from "evergreen-ui"
import { observer } from "mobx-react"

import AuthTemplate from "../../../components/templates/AuthTemplate"
import { useStores } from "../../../../lib/mobx"

const Signin = () => {

	const { authStore } = useStores()
	const [isShown, setIsShown] = useState(authStore.temporaryData.isJustRegistered)
	const [formData, setFormData] = useState({
		email: authStore.temporaryData.email,
		password: ""
	})

	useEffect(() => {
		authStore.setTemporaryData({
			isJustRegistered: false
		})
	}, [])

	const onSubmitForm = () => {
		if (!formData.email || !formData.password) return
		authStore.signin(formData)
	}

	const onInputChange = (
		e: React.ChangeEvent<HTMLInputElement>,
		fieldName: keyof typeof formData
	) => {
		setFormData(prev => ({
			...prev,
			[fieldName]: e.target.value
		}))
	}

	return (
		<>
			<AuthTemplate
				title="Войти в систему"
				error={authStore.states.errors.signin}
				btnContent="Войти"
				btnLoading={authStore.states.loading.signin}
				onSubmitForm={onSubmitForm}
				btnIcon={LogInIcon}
				linkToSignup
			>
				<>
					<TextInputField
					  inputWidth={380}
					  inputHeight={40}
					  label="Почтовый адрес"
					  placeholder="example@example.com"
						isInvalid={false}
					  validationMessage={null}
					  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e, "email")}
					  value={formData.email}
					  required
					/>
					<TextInputField
						inputWidth={380}
					  label="Пароль"
					  placeholder="********"
					  isInvalid={false}
					  validationMessage={null}
					  inputHeight={40}
					  borderWidth={3}
					  type="password"
					  onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e, "password")}
					  value={formData.password}
					  required
					/>
				</>
			</AuthTemplate>
			<CornerDialog
	      title="Регистрация прошла успешно !"
	      isShown={isShown}
	      onCloseComplete={() => setIsShown(false)}
	      cancelLabel="Закрыть"
	      confirmLabel="Подтвердить"
	    >
	      Регистрация аккаунта { authStore.temporaryData.email } успешно пройдена
	    </CornerDialog>
    </>
	)
}

export default observer(Signin)