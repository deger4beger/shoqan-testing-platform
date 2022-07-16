import axios from "axios"
import {
	UserSigninPayload,
	UserSigninResponse,
	UserSignupPayload
} from "../../../types"

const instance = axios.create({
    baseURL: "https://shoqan-platform.herokuapp.com" // http://localhost:8000
})

export const authApi = {
  signup(payload: UserSignupPayload): Promise<void> {
    return instance.post<void>("user/register/", payload)
      .then(res => res.data)
  },
  signin(payload: UserSigninPayload): Promise<UserSigninResponse> {
  	return instance.post<UserSigninResponse>("user/login/", payload)
  		.then(res => res.data)
  }
}