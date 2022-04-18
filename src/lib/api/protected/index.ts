import axios from "axios"

import { protectedInterceptor } from "./index.interceptors"
import { UserProfile } from "../../../types"

const authInstance = axios.create({
    baseURL: "http://localhost:8000" // https://shoqan-platform.herokuapp.com
})

authInstance.interceptors.request.use(protectedInterceptor)

export const userApi = {
	getProfile(): Promise<UserProfile> {
		return authInstance.get<UserProfile>("user/profile/")
      .then(res => res.data)
	},
  sendProfile(payload: any): Promise<UserProfile> {
    return authInstance.post<UserProfile>("user/profile/", payload)
      .then(res => res.data)
  }
}