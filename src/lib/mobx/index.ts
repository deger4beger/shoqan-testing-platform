import React from "react"
import { AuthStore } from "./stores/auth"

export class RootStore {

	authStore: AuthStore

  constructor() {
    this.authStore = new AuthStore(this)
  }

}

const StoresContext = React.createContext(new RootStore())

export const useStores = () => React.useContext(StoresContext)