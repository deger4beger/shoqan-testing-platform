import { makeAutoObservable, flow } from "mobx"
import { RootStore } from ".."
import { Question, TestToPass } from "../../../types"
import { testApi } from "../../api/protected"

export class PassingStore {

	rootStore: RootStore

	test = null as TestToPass | null
	testToPass = null as Question[] | null
	allowToPass = false

	states = {
		loading: {
			getTest: false
		},
		errors: {
			getTest: false as boolean | string
		}
	}

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

	getTestToPass = flow(function* (
		this: PassingStore
	) {
		this.states.loading.getTest = true
		try {

			const data = yield testApi.getTestByTestId(this.test!.id)
			this.states.errors.getTest = false

			this.testToPass = data

		} catch (e: any) {
			this.states.errors.getTest = e
		} finally {
			this.states.loading.getTest = false
		}
	})

}