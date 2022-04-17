import React from "react"
import { AuthStore } from "./stores/auth"
import { UserStore } from "./stores/user"

export class RootStore {

	authStore: AuthStore
	userStore: UserStore

  constructor() {
    this.authStore = new AuthStore(this)
    this.userStore = new UserStore(this)
  }

}

export const store = new RootStore()
const StoresContext = React.createContext(store)

export const useStores = () => React.useContext(StoresContext)