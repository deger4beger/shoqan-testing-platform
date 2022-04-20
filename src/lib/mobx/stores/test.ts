import { makeAutoObservable, flow } from "mobx"
import { RootStore } from ".."
import { UploadTestPayload } from "../../../types/test"
import { testApi } from "../../api/protected"

export class TestStore {

	rootStore: RootStore

	states = {
		loading: {
			upload: false
		},
		errors: {
			upload: false
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

}