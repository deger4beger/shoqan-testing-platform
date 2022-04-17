import { makeAutoObservable, flow } from "mobx"
import { RootStore } from ".."
import { UserProfile } from "../../../types"
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
		payload: UserProfile
	) {
		this.states.loading.profile = true
		try {
			const data = new FormData()
			const { photo, ...otherData } = payload
			console.log(photo, otherData)
			const json = JSON.stringify(otherData)
			const blob = new Blob([json], {
			  type: "application/json"
			})
			data.append("photo", photo)
			data.append("userProfile", blob)
			console.log(data)
			yield userApi.sendProfile(data)
			this.states.errors.profile = false
			this.setUserProfile(payload)
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