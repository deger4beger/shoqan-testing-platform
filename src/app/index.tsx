import "./index.scss"
import React, { useEffect } from "react"
import { Pane, Text } from "evergreen-ui"
import { BrowserRouter } from "react-router-dom"
import { observer } from "mobx-react"

import { useStores } from "../lib/mobx"
import Signin from "./pages/unauthorized/Signin"
import AppRouter from "./components/singletone/AppRouter"
import Header from "./components/singletone/Header"

function App() {

	const { authStore } = useStores()

	useEffect(() => {
		authStore.initializeUser()
	}, [])

  return (
  	<BrowserRouter>
  		{authStore.isLoggedIn &&
  			<Header
  				userIdentifier={authStore.userData.email as string}
  				isAdmin={authStore.userData.isAdmin as boolean}
  			/>
  		}
  		<AppRouter isAdmin={authStore.userData.isAdmin} />
  	</BrowserRouter>
  )
}

export default observer(App)