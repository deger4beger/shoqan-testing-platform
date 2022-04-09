import axios from "axios"
import { UserLoginPayload } from "../../../types"

const authInstance = axios.create({
    baseURL: "https://shoqan-platform.herokuapp.com"
})

export const authApi = {
  signup(payload: UserLoginPayload): Promise<void> {
    return authInstance.post<void>("user/register/", payload)
      .then(res => res.data)
  }
}