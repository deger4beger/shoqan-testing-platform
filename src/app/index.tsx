import "./index.scss"
import React, { useEffect, useState } from "react"
import { Pane, Text } from "evergreen-ui"
import { HashRouter } from "react-router-dom"
import { observer } from "mobx-react"
import * as faceapi from "face-api.js"

import { useStores } from "../lib/mobx"
import Signin from "./pages/unauthorized/Signin"
import AppRouter from "./components/singletone/AppRouter"
import Header from "./components/singletone/Header"
import Footer from "./components/singletone/Footer"
import Preloader from "./components/reusable/Preloader"

function App() {

  const [isNetsLoading, setIsNetsLoading] = useState(true)
  const { authStore, userStore } = useStores()

  useEffect(() => {
    authStore.initializeUser()
    const loadNets = async () => {
      await faceapi.loadSsdMobilenetv1Model("/models")
      await faceapi.loadTinyFaceDetectorModel("/models")
      await faceapi.loadFaceLandmarkModel("/models")
      await faceapi.loadFaceRecognitionModel("/models")
      await faceapi.loadMtcnnModel("/models")
      setIsNetsLoading(false)
    }
    loadNets()
  }, [])

  const isAuthorized = (authStore.userData.isAdmin !== null)

  if (!authStore.isInitialized || isNetsLoading) {
    return <Pane width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
      <Preloader />
    </Pane>
  }

  return (
    <HashRouter>
      {authStore.isLoggedIn &&
        <Header
          userIdentifier={authStore.userData.email as string}
          isAdmin={authStore.userData.isAdmin as boolean}
          isProfileFilled={!!userStore.profile}
        />
      }
      <Pane paddingTop={isAuthorized ? 50 : 0} className="main">
         <AppRouter isAdmin={authStore.userData.isAdmin} />
      </Pane>
      {authStore.isLoggedIn && <Footer /> }
    </HashRouter>
  )
}

export default observer(App)