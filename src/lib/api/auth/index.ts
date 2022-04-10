import axios from "axios"
import {
	UserSigninPayload,
	UserSigninResponse,
	UserSignupPayload
} from "../../../types"

const authInstance = axios.create({
    baseURL: "https://shoqan-platform.herokuapp.com"
})

export const authApi = {
  signup(payload: UserSignupPayload): Promise<void> {
    return authInstance.post<void>("user/register/", payload)
      .then(res => res.data)
  },
  signin(payload: UserSigninPayload): Promise<UserSigninResponse> {
  	return authInstance.post<UserSigninResponse>("user/login/", payload)
  		.then(res => res.data)
  }
}