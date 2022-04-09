import React from "react"
import { makeAutoObservable } from "mobx"
import { RootStore } from ".."

export class AuthStore {

	token: string | null = null
	rootStore: RootStore

	constructor (rootStore: RootStore) {
		this.rootStore = rootStore
		makeAutoObservable(this)
	}

}

const StoresContext = React.createContext(new RootStore())

export const useStores = () => React.useContext(StoresContext)