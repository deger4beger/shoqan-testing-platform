import { makeAutoObservable, flow } from "mobx"
import { RootStore } from ".."
import { UserProfile, UserProfilePayload } from "../../../types"
import { userApi } from "../../api/protected"

export class UserStore {

	rootStore: RootStore

	profile = null as null | UserProfile
	isInitialized = false
	states = {
		loading: {
			base: false,
			profile: false
		},
		errors: {
			base: false as boolean | string,
			profile: false as boolean | string
		}
	}

	constructor (rootStore: RootStore) {
		this.rootStore = rootStore
		makeAutoObservable(this)
	}

	sendProfile = flow(function* (
		this: UserStore,
		payload: UserProfilePayload
	) {
		this.states.loading.profile = true
		try {
			const { photo, ...otherData } = payload

			const data = new FormData()
			const json = JSON.stringify(otherData)
			const blob = new Blob([json], {
			  type: "application/json"
			})
			data.append("photo", photo)
			data.append("userProfile", blob)
			const response = yield userApi.sendProfile(data)

			this.states.errors.profile = false
			this.setUserProfile(response)
		} catch (e: any) {
			this.states.errors.profile = e
		} finally {
			this.states.loading.profile = false
		}
	})

	getCabinetData = flow(function* (
		this: UserStore
	) {
		this.states.loading.base = true
		try {
			const response = yield userApi.getProfile()
			this.states.errors.base = false
			if (response) {
				this.setUserProfile(response)
			}
			this.isInitialized = true
		} catch (e: any) {
			this.states.errors.base = e
		} finally {
			this.states.loading.base = false
		}
	})

	setUserProfile(profile: UserProfile | null, fullClean=false) {
		this.profile = profile
		if (fullClean) this.isInitialized = false
	}

	cleanData() {
		this.isInitialized = false
	}

}