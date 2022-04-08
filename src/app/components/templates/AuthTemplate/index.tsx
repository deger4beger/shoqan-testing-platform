import React from 'react'
import { Pane, Heading, Button, Text, TextInputField } from 'evergreen-ui'

interface AuthTemplateProps {
	children?: React.ReactNode
	title?: string
	btnContent?: string
	btnLoading?: boolean
	btnOnClick?: (e: React.MouseEvent<HTMLDivElement>) => void
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({
	children,
	title,
	btnContent,
	btnLoading,
	btnOnClick
}) => {
	return (
		<Pane
				width="100vw"
				height="100vh"
				display="flex"
				justifyContent="center"
				alignItems="center"
			>
			<Pane
					display="flex"
					alignItems="center"
					flexDirection="column"
					border={true}
					background="gray50"
					borderWidth={2}
					borderRadius={4}
					padding={40}
				>
				<Pane borderBottom="1px solid black" marginBottom="30px">
					<Heading size={800}>
						Регистрация
					</Heading>
				</Pane>
				<Pane>
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
					/>
				</Pane>
				<Pane marginTop="10px">
					<Button size="large">
						Зарегистрироваться
					</Button>
				</Pane>
			</Pane>
		</Pane>
	);
}

export default AuthTemplate