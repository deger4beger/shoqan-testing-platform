import { makeAutoObservable, flow } from "mobx"
import { RootStore } from ".."
import { UserProfile, UserProfilePayload } from "../../../types"
import { userApi } from "../../api/protected"

export class UserStore {

	rootStore: RootStore

	profile = null as null | UserProfile
	states = {
		loading: {
			profile: false
		},
		errors: {
			profile: false
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

	setUserProfile(profile: UserProfile) {
		this.profile = profile
	}

}