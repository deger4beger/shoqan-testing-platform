import React, { useState } from "react"
import { observer } from "mobx-react"
import { useHistory } from "react-router-dom"
import { TextInputField, SendMessageIcon } from "evergreen-ui"

import AuthTemplate from "../../../components/templates/AuthTemplate"
import { useStores } from "../../../../lib/mobx"

const Signup = () => {

	const history = useHistory()
	const { authStore } = useStores()
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	})

	const onSubmitForm = async () => {
		if (!formData.email || !formData.password) return
		await authStore.signup(formData)
		if (!authStore.states.errors.signup) {
			history.push("/signin")
		}
	}

	const setFormFieldValue = (
		fieldName: keyof typeof formData
	) => (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setFormData(prev => ({
			...prev,
			[fieldName]: e.target.value
		}))
	}

	return (
		<>
			<AuthTemplate
				title="Регистрация"
				error={authStore.states.errors.signup}
				btnContent="Зарегистрироваться"
				btnLoading={authStore.states.loading.signup}
				onSubmitForm={onSubmitForm}
				btnIcon={SendMessageIcon}
			>
				<>
					<TextInputField
					  inputWidth={380}
					  inputHeight={40}
					  label="Почтовый адрес"
					  placeholder="example@example.com"
						isInvalid={false}
					  validationMessage={null}
					  onChange={setFormFieldValue("email")}
					  value={formData.email}
					  required
					/>
					<TextInputField
					  inputWidth={380}
					  inputHeight={40}
					  label="Пароль"
					  placeholder="*****"
						isInvalid={false}
					  validationMessage={null}
					  onChange={setFormFieldValue("password")}
					  value={formData.password}
					  type={"password"}
					  required
					/>
				</>
			</AuthTemplate>
		</>
	)
}

export default observer(Signup)