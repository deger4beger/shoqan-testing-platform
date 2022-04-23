import React from 'react'
import { Heading, Pane, Button, Text, TextInputField, UserIcon } from 'evergreen-ui'
import { Link } from "react-router-dom"

interface AuthTemplateProps {
	children: React.ReactNode
	title: string
	linkToSignup?: boolean
	btnContent: string
	btnLoading: boolean
	onSubmitForm: () => void
	btnIcon: any
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({
	children,
	title,
	linkToSignup = false,
	btnContent,
	btnLoading,
	onSubmitForm,
	btnIcon
}) => {

	const onEnterClick = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !btnLoading) {
      onSubmitForm()
    }
  }

	return (
		<Pane
				width="100vw"
				height="100vh"
				display="flex"
				justifyContent="center"
				alignItems="center"
				onKeyPress={onEnterClick}
			>
			<Pane
					display="flex"
					alignItems="center"
					flexDirection="column"
					background="tint2"
					border={true}
					borderWidth={2}
					padding={40}
				>
				<Pane
						borderBottom="2px solid #c1c4d6"
						paddingBottom={4}
						width="60%"
						textAlign="center"
						marginBottom="30px"
					>
					<Heading size={600}>
						{title}
					</Heading>
				</Pane>
				<Pane>
					{children}
				</Pane>
				<Pane marginTop="10px">
					<Button
							size="large"
							iconBefore={btnIcon}
							isLoading={btnLoading}
							onClick={onSubmitForm}
						>
						{btnContent}
					</Button>
				</Pane>
				{ linkToSignup && (
					<Pane
							display="flex"
							alignItems="center"
							flexDirection="column"
							marginTop="20px"
							paddingTop="20px"
							width="100%"
							borderTop={true}
						>
						<Text color="muted">
							Нет аккаунта ?
						</Text>
						<Text color="muted">
							Пожалуйста, пройдите
								<Link to="/signup">
									<Text color="selected">
										&nbsp;регистрацию
									</Text>
								</Link>
						</Text>
					</Pane>
				)}
			</Pane>
		</Pane>
	);
}

export default AuthTemplate