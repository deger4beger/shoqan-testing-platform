import axios from "axios"

import { protectedInterceptor } from "./index.interceptors"
import { Answers, Question, StressData, TestForDiscipline, TestForDisciplineParams, UserProfile } from "../../../types"

const instance = axios.create({
    baseURL: "http://localhost:8000" // https://shoqan-platform.herokuapp.com
})

instance.interceptors.request.use(protectedInterceptor)

export const userApi = {
	getProfile(): Promise<UserProfile> {
		return instance.get<UserProfile>("user/profile/")
      .then(res => res.data)
	},
  sendProfile(payload: any): Promise<UserProfile> {
    return instance.post<UserProfile>("user/profile/", payload)
      .then(res => res.data)
  }
}

export const testApi = {
	uploadTest(payload: any): Promise<void> {
		return instance.post<void>("test/", payload)
			.then(res => res.data)
	},
	getStressData(): Promise<StressData> {
		return instance.get<StressData>("test/stress/")
			.then(res => res.data)
	},
	postStressData(payload: Answers): Promise<void> {
		return instance.post<void>("test/stress/", payload)
			.then(res => res.data)
	},
	getTestByDiscipline(params: TestForDisciplineParams): Promise<TestForDiscipline[]> {
		return instance.get<TestForDiscipline[]>("test/", {
			params
		}).then(res => res.data)
	},
	getTestByTestId(testId: string): Promise<Question[]> {
		return instance.get<Question[]>(`test/${testId}`)
			.then(res => res.data)
	}
}