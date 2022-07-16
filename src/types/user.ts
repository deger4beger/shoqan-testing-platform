import { Competence } from "."

export interface UserSignupPayload {
	email: string
	password: string
}

export interface UserSigninPayload extends UserSignupPayload { }

export interface UserData {
	id: string
	email: string
	isAdmin: boolean
}

export interface UserSigninResponse extends UserData {
	token: string
}

export interface UserProfilePayload {
	fullname: string
	specialty: string
	course: string
	sps: number
	photo: File
}

export interface UserProfile extends Omit<UserProfilePayload, "photo"> {
	photo: string
	stress: null | string
}

export interface CompetenceResponse {
	competencies: Competence[]
}