import { makeAutoObservable, flow } from "mobx"
import { RootStore } from ".."

import { UserLoginPayload } from "../../../types"
import { authApi } from "../../api"

export class AuthStore {

	rootStore: RootStore
	token: string | null = null
	loading = {
		signup: false
	}
	error = {
		signup: null
	}

	constructor (rootStore: RootStore) {
		this.rootStore = rootStore
		makeAutoObservable(this)
	}

	signup = flow(function* (this: AuthStore, payload: UserLoginPayload) {
		this.loading.signup = true
		try {
			yield authApi.signup(payload)
		} catch (e: any) {
			this.error.signup = e
		} finally {
			this.loading.signup = false
		}
	})

}