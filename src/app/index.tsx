import "./index.scss"
import React from "react"
import { Pane, Text } from "evergreen-ui"
import { BrowserRouter } from "react-router-dom"

import Signin from "./pages/unauthorized/Signin"
import AppRouter from "./components/singletone/AppRouter"

function App() {
  return (
  	<BrowserRouter>
  		<AppRouter role="unauthorized" />
  	</BrowserRouter>
  )
}

export default App