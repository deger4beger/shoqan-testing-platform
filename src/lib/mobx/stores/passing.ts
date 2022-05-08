import { makeAutoObservable, flow } from "mobx"
import { RootStore } from ".."
import { PassTestPayload, PassTestReponse, Question, TestToPass } from "../../../types"
import { testApi } from "../../api/protected"

export class PassingStore {

	rootStore: RootStore

	test = null as TestToPass | null
	testToPass = null as Question[] | null
	passedInfo = null as PassTestReponse | null
	allowToPass = false

	states = {
		loading: {
			getTest: false,
			passTest: false
		},
		errors: {
			getTest: false as boolean | string,
			passTest: false as boolean | string
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

	resetAllData() {
		this.passedInfo = null
		this.testToPass = null
		this.resetData()
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

	passTest = flow(function* (
		this: PassingStore,
		payload: PassTestPayload
	) {
		this.states.loading.passTest = true
		try {

			const data = yield testApi.passTestByTestId(this.test!.id, payload)
			this.states.errors.passTest = false

			this.passedInfo = data

		} catch (e: any) {
			this.states.errors.passTest = e
		} finally {
			this.states.loading.passTest = false
		}
	})

}