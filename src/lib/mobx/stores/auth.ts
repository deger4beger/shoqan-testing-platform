import { makeAutoObservable, flow } from "mobx"
import { RootStore } from ".."

import {
	UserData,
	UserSigninPayload,
	UserSigninResponse,
	UserSignupPayload
} from "../../../types"
import { authApi } from "../../api"
import { validateToken } from "../../jwt"

export class AuthStore {

	rootStore: RootStore

	isLoggedIn = false
	isInitialized = false
	userData = {
		id: null as null | string,
		email: null as null | string,
		isAdmin: null as null | boolean
	}
	temporaryData = {
		isJustRegistered: false,
		email: ""
	}
	states = {
		loading: {
			signup: false,
			signin: false
		},
		errors: {
			signup: false,
			signin: false
		}
	}

	constructor (rootStore: RootStore) {
		this.rootStore = rootStore
		makeAutoObservable(this)
	}

	signup = flow(function* (
		this: AuthStore,
		payload: UserSignupPayload
	) {
		this.states.loading.signup = true
		try {
			yield authApi.signup(payload)
			this.states.errors.signup = false
			this.setTemporaryData({
				isJustRegistered: true,
				email: payload.email
			})
		} catch (e: any) {
			this.states.errors.signup = e
		} finally {
			this.states.loading.signup = false
		}
	})

	signin = flow(function* (
		this: AuthStore,
		payload: UserSigninPayload
	) {
		this.states.loading.signin = true
		try {
			const response = yield authApi.signin(payload)
			this.states.errors.signin = false
			const { token, ...userData } = response
			this.setMyData(userData, token)
		} catch (e: any) {
			this.states.errors.signin = e
		} finally {
			this.states.loading.signin = false
		}
	})

	initializeUser() {
		const userData = validateToken()
		if (userData) {
			this.setMyData(userData)
		} else {
			this.logout()
		}
		this.isInitialized = true
	}

	logout() {
		this.userData = {
			id: null,
			email: null,
			isAdmin: null
		}
		this.isLoggedIn = false
		this.temporaryData = {
			isJustRegistered: false,
			email: ""
		}
		localStorage.removeItem("key")
	}

	setMyData(data: UserData, userToken: string | null = null) {
		this.userData = {
			...this.userData,
			...data
		}
		this.isLoggedIn = true
		userToken && localStorage.setItem("key", userToken)
	}

	setTemporaryData(data: Partial<typeof this.temporaryData>) {
		this.temporaryData = {
			...this.temporaryData,
			...data
		}
	}

}