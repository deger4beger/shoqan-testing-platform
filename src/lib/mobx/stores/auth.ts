import { makeAutoObservable, flow } from "mobx"
import { RootStore } from ".."

import { UserLoginPayload } from "../../../types"
import { authApi } from "../../api"

export class AuthStore {

	rootStore: RootStore

	userData = {
		token: null,
		role: null
	}
	temporaryData = {
		isJustRegistered: false,
		email: null as null || ""
	}
	states = {
		loading: {
			signup: false
		},
		errors: {
			signup: false
		}
	}

	constructor (rootStore: RootStore) {
		this.rootStore = rootStore
		makeAutoObservable(this)
	}

	signup = flow(function* (this: AuthStore, payload: UserLoginPayload) {
		this.states.loading.signup = true
		try {
			yield authApi.signup(payload)
			this.states.errors.signup = false
			this.temporaryData.isJustRegistered = true
			this.temporaryData.email = payload.email
		} catch (e: any) {
			this.states.errors.signup = e
		} finally {
			this.states.loading.signup = false
		}
	})

	setTemporaryData(data: Partial<typeof this.temporaryData>) {
		this.temporaryData = {
			...this.temporaryData,
			...data
		}
	}

}