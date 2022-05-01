import { makeAutoObservable, flow } from "mobx"
import { RootStore } from ".."
import { TestToPass } from "../../../types"

export class PassingStore {

	rootStore: RootStore

	test = null as TestToPass | null
	allowToPass = false

	constructor (rootStore: RootStore) {
		this.rootStore = rootStore
		makeAutoObservable(this)
	}

	setPassingTest(test: TestToPass) {
		this.test = test
	}

	setAllowToPass(allow: boolean) {
		this.allowToPass = allow
	}

	resetData() {
		this.test = null
		this.allowToPass = false
	}

}