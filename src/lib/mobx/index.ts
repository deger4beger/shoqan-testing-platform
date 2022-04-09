import { AuthStore } from "./stores/auth"

export class RootStore {

	authStore: AuthStore

  constructor() {
    this.authStore = new AuthStore(this)
  }
}