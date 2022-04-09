import { makeAutoObservable } from "mobx"
import { RootStore } from ".."

export class AuthStore {

	rootStore: RootStore
	token: string | null = null

	constructor (rootStore: RootStore) {
		this.rootStore = rootStore
		makeAutoObservable(this)
	}

}