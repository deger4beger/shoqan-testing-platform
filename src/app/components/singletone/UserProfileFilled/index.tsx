import React from 'react'
import { Avatar, Heading, Pane, Text } from "evergreen-ui"
import { UserProfile } from "../../../../types"
import { toJS } from "mobx"

interface UserProfileFilledProps {
	profile: UserProfile
}

const UserProfileFilled: React.FC<UserProfileFilledProps> = ({profile}) => {

	const data = toJS(profile)

	return (
		<>
			<Pane marginBottom={20}>
				<Pane textAlign="center">
					<Heading size={600} borderBottom="2px solid #c1c4d6" paddingBottom={6}>
	    			Ваша анкета
	    		</Heading>
				</Pane>
				<Pane display="flex" alignItems="center" justifyContent="center" marginTop={20}>
					<Avatar
					  src={data.photo}
					  size={180}
					/>
				</Pane>
			</Pane>
			<Pane display="flex" flexDirection="column">
				<Heading marginTop={10} size={500}>
					ФИО: <Text size={500}>
						{ data.fullname }
					</Text>
				</Heading>
				<Heading marginTop={10} size={500}>
					Специальность: <Text size={500}>
						{ data.specialty }
					</Text>
				</Heading>
				<Heading marginTop={10} size={500}>
					Курс: <Text size={500}>
						{ data.course }
					</Text>
				</Heading>
			</Pane>
		</>
	)
}

export default UserProfileFilled