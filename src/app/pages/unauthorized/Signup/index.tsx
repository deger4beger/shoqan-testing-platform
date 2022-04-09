import React from "react"
import { TextInputField, SendMessageIcon } from "evergreen-ui"
import { AuthTemplate } from "../../../components/templates"

const Signup = () => {

	const onSignupClick = () => {
		console.log("logged in")
	}

	return (
		<AuthTemplate
			title="Зарегистрироваться"
			btnContent="Отправить одноразовый пароль"
			btnLoading={false}
			btnOnClick={onSignupClick}
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
				/>
			</>
		</AuthTemplate>
	)
}

export default Signup