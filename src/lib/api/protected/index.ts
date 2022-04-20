import axios from "axios"

import { protectedInterceptor } from "./index.interceptors"
import { UserProfile } from "../../../types"

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
		return instance.post<void>("admin/test/", payload)
			.then(res => res.data)
	}
}