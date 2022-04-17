import axios from "axios"
import { validateToken } from "../../jwt"
import { store } from "../../mobx"

export const protectedInterceptor = (config) => {
    const tokenPayload = validateToken()
    const token = tokenPayload ? tokenPayload.token : null
    if (token) {
        // (config.headers ??= {}).Authorization = `Bearer ${userData.token}` not working
        !config.headers && (config.headers = {})
        config.headers.Authorization = `Bearer ${token}`
    }
    if (!token) {
        store.authStore.logout()
        throw new axios.Cancel('Operation canceled due to invalid token')
    }
    return config
}