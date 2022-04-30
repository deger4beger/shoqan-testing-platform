import { makeAutoObservable, flow } from "mobx"
import { RootStore } from ".."

export class PassingStore {

	rootStore: RootStore

	testId = null as string | null

	constructor (rootStore: RootStore) {
		this.rootStore = rootStore
		makeAutoObservable(this)
	}

	setPassingTest(id: string) {
		this.testId = id
	}

	resetData() {
		this.testId = null
	}

}