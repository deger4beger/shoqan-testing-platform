import { makeAutoObservable, flow } from "mobx"
import { RootStore } from ".."
import { TestToPass } from "../../../types"

export class PassingStore {

	rootStore: RootStore

	test = null as TestToPass | null

	constructor (rootStore: RootStore) {
		this.rootStore = rootStore
		makeAutoObservable(this)
	}

	setPassingTest(test: TestToPass) {
		this.test = test
	}

	resetData() {
		this.test = null
	}

}