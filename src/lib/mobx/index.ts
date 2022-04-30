import React from "react"
import { AuthStore } from "./stores/auth"
import { UserStore } from "./stores/user"
import { TestStore } from "./stores/test"
import { PassingStore } from "./stores/passing"

export class RootStore {

	authStore: AuthStore
	userStore: UserStore
	testStore: TestStore
	passingStore: PassingStore

  constructor() {
    this.authStore = new AuthStore(this)
    this.userStore = new UserStore(this)
    this.testStore = new TestStore(this)
    this.passingStore = new PassingStore(this)
  }

}

export const store = new RootStore()
const StoresContext = React.createContext(store)

export const useStores = () => React.useContext(StoresContext)