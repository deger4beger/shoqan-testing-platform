import axios from "axios"

import { protectedInterceptor } from "./index.interceptors"
import { UserProfile } from "../../../types"

const authInstance = axios.create({
    baseURL: "http://localhost:8000" // https://shoqan-platform.herokuapp.com
})

authInstance.interceptors.request.use(protectedInterceptor)

export const userApi = {
  sendProfile(payload: any): Promise<void> {
    return authInstance.post<void>("user/profile/", payload)
      .then(res => res.data)
  }
}