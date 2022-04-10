import decode, { JwtPayload } from "jwt-decode"
import { UserData } from "../../types"

export const validateToken = () => {
	const token = localStorage.getItem("key")
	if (!token) {
		return false
	}
  const decodedToken = decode<JwtPayload & UserData>(token)
	const { exp, ...userData } = decodedToken
	if (decodedToken.exp && (decodedToken.exp * 1000 > new Date().getTime())) {
		return userData
	}
	return false
}