import { makeAutoObservable, flow } from "mobx"
import { RootStore } from ".."
import { Certificate, GetCertificatesParams, PassTestPayload, PassTestReponse, Question, TestToPass } from "../../../types"
import { certificateApi, testApi } from "../../api/protected"

export class CertificateStore {

	rootStore: RootStore

	certificates = null as null | Certificate[]

	states = {
		loading: {
			get: false
		},
		errors: {
			get: false as boolean | string
		}
	}

	constructor (rootStore: RootStore) {
		this.rootStore = rootStore
		makeAutoObservable(this)
	}

	resetAllData() {
		this.certificates = null
	}

	getCertificates = flow(function* (
		this: CertificateStore,
		params: GetCertificatesParams
	) {
		this.states.loading.get = true
		try {

			const data = yield certificateApi.getCertificates(params)
			this.states.errors.get = false

			if (!data) {
				this.certificates = []
			} else {
				this.certificates = data
			}

		} catch (e: any) {
			this.states.errors.get = e
		} finally {
			this.states.loading.get = false
		}
	})

}