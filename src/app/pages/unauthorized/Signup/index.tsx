import React, { useState } from "react"
import { observer } from "mobx-react"
import { useHistory } from "react-router-dom"
import { TextInputField, SendMessageIcon } from "evergreen-ui"

import AuthTemplate from "../../../components/templates/AuthTemplate"
import { useStores } from "../../../../lib/mobx"

const Signup = () => {

	const history = useHistory()
	const { authStore } = useStores()
	const [email, setEmail] = useState("")


	const onSubmitForm = async () => {
		if (!email) return
		await authStore.signup({ email })
		if (!authStore.states.errors.signup) {
			history.push("/signin")
		}
	}

	const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.currentTarget.value)
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
					  onChange={onEmailChange}
					  value={email}
					  required
					/>
				</>
			</AuthTemplate>
		</>
	)
}

export default observer(Signup)