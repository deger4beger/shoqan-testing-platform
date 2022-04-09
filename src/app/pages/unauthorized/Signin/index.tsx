import React from "react"
import { TextInputField, LogInIcon } from "evergreen-ui"
import AuthTemplate from "../../../components/templates/AuthTemplate"

const Signin = () => {

	const onSigninClick = () => {
		console.log("logged in")
	}

	return (
		<AuthTemplate
			title="Войти в систему"
			btnContent="Войти"
			btnLoading={false}
			btnOnClick={onSigninClick}
			btnIcon={LogInIcon}
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
				<TextInputField
					inputWidth={380}
				  label="Пароль"
				  placeholder="********"
				  isInvalid={false}
				  validationMessage={null}
				  inputHeight={40}
				  borderWidth={3}
				  type="password"
				/>
			</>
		</AuthTemplate>
	)
}

export default Signin