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
					<Heading size={700} borderBottom="1px solid black" paddingBottom={6}>
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
			<Pane>
				<Heading marginTop={10}>
					Специальность: <Text>
						{ data.fullname }
					</Text>
				</Heading>
				<Heading marginTop={10}>
					Специальность: <Text>
						{ data.specialty }
					</Text>
				</Heading>
				<Heading marginTop={10}>
					Курс: <Text>
						{ data.course }
					</Text>
				</Heading>
			</Pane>
		</>
	)
}

export default UserProfileFilled