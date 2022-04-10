import "./index.scss"
import React, { useEffect } from "react"
import { Pane, Text } from "evergreen-ui"
import { BrowserRouter } from "react-router-dom"
import { observer } from "mobx-react"

import { useStores } from "../lib/mobx"
import Signin from "./pages/unauthorized/Signin"
import AppRouter from "./components/singletone/AppRouter"

function App() {

	const { authStore } = useStores()

	useEffect(() => {
		authStore.initializeUser()
	}, [])

  return (
  	<BrowserRouter>
  		<AppRouter isAdmin={authStore.userData.isAdmin} />
  	</BrowserRouter>
  )
}

export default observer(App)