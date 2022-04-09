import React from 'react'
import { Pane, Heading, Button, Text, TextInputField, UserIcon } from 'evergreen-ui'

interface AuthTemplateProps {
	children: React.ReactNode
	title: string
	btnContent: string
	btnLoading: boolean
	btnOnClick: (e: React.MouseEvent<HTMLButtonElement>) => void
	btnIcon: any
}

const AuthTemplate: React.FC<AuthTemplateProps> = ({
	children,
	title,
	btnContent,
	btnLoading,
	btnOnClick,
	btnIcon
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
					background="tint2"
					border={true}
					borderWidth={2}
					padding={40}
				>
				<Pane borderBottom="1px solid black" marginBottom="30px">
					<Heading size={800}>
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
							onClick={btnOnClick}
						>
						{btnContent}
					</Button>
				</Pane>
			</Pane>
		</Pane>
	);
}

export default AuthTemplate