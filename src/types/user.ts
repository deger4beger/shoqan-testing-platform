export interface UserSignupPayload {
	email: string
}

export interface UserSigninPayload extends UserSignupPayload {
	password: string
}

export interface UserData {
	id: string
	email: string
	isAdmin: boolean
}

export interface UserSigninResponse extends UserData {
	token: string
	profile: UserProfile
}

export interface UserProfile {
	fullname: string
	specialty: string
	course: string
	photo: File
}