import { makeAutoObservable, flow } from "mobx"
import { RootStore } from ".."
import { UploadTestPayload } from "../../../types/test"
import { testApi } from "../../api/protected"
import { Answers, Question, TestForDiscipline, TestForDisciplineParams } from "../../../types"

export class TestStore {

	rootStore: RootStore

	passed = null as null | boolean
	psychologyTest = null as null | Question[]
	testsForDiscipline = null as null | TestForDiscipline[]
	states = {
		loading: {
			upload: false,
			stress: false,
			stressPost: false,
			testsForDisc: false
		},
		errors: {
			upload: false as boolean | string,
			stress: false as boolean | string,
			stressPost: false as boolean | string,
			testsForDisc: false as boolean | string
		}
	}

	constructor (rootStore: RootStore) {
		this.rootStore = rootStore
		makeAutoObservable(this)
	}

	uploadTest = flow(function* (
		this: TestStore,
		payload: UploadTestPayload
	) {
		this.states.loading.upload = true
		try {

			const data = new FormData()
			const { file, info } = payload

			const json = JSON.stringify(info)
			const blob = new Blob([json], {
			  type: "application/json"
			})

			data.append("file", file)
			data.append("info", blob)

			yield testApi.uploadTest(data)

			this.states.errors.upload = false

		} catch (e: any) {
			this.states.errors.upload = e
		} finally {
			this.states.loading.upload = false
		}
	})

	getStressData = flow(function* (
		this: TestStore
	) {
		this.states.loading.stress = true
		try {

			const data = yield testApi.getStressData()
			this.states.errors.stress = false

			const { passed, test } = data
			this.passed = passed
			this.psychologyTest = test

		} catch (e: any) {
			this.states.errors.stress = e
		} finally {
			this.states.loading.stress = false
		}
	})

	postStressData = flow(function* (
		this: TestStore,
		payload: Answers
	) {
		this.states.loading.stressPost = true
		try {

			const data = yield testApi.postStressData(payload)
			this.states.errors.stressPost = false

			this.passed = true
			this.psychologyTest = null

		} catch (e: any) {
			this.states.errors.stressPost = e
		} finally {
			this.states.loading.stressPost = false
		}
	})

	getTestsForDiscipline = flow(function* (
		this: TestStore,
		payload: TestForDisciplineParams
	) {
		this.states.loading.testsForDisc = true
		try {

			const data = yield testApi.getTestByDiscipline(payload)
			this.states.errors.testsForDisc = false

			this.testsForDiscipline = data.sort(test => test.passed ? 1 : -1)

		} catch (e: any) {
			this.states.errors.testsForDisc = e
		} finally {
			this.states.loading.testsForDisc = false
		}
	})

	resetData() {
		this.passed = null
		this.psychologyTest = null
		this.testsForDiscipline = null
	}

}