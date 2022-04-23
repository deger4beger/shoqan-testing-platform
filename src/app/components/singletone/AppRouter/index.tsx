import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { RouteNames, adminRoutes, unauthorizedRoutes, userRoutes } from "../../../router"
import { Pane } from "evergreen-ui"

interface AppRouterProps {
  isAdmin: null | boolean
}

const AppRouter: React.FC<AppRouterProps> = ({ isAdmin }) => {

  const isAuthorized = (isAdmin !== null)

  const getRoutes = () => {
    switch (isAdmin) {
      case null:
        return (
          <Switch>
            {unauthorizedRoutes.map(route =>
              <Route { ...route } key={route.path} />
            )}
            <Redirect to={RouteNames.SIGNIN}/>
          </Switch>
        )
      case false:
        return (
          <Switch>
            {userRoutes.map(route =>
              <Route { ...route } key={route.path} />
            )}
            <Redirect to={RouteNames.CABINET}/>
          </Switch>
        )
      case true:
        return (
          <Switch>
            {adminRoutes.map(route =>
              <Route { ...route } key={route.path} />
            )}
            <Redirect to={RouteNames.CERTIFICATES} />
          </Switch>
        )
      default:
        return "Some error occured"
    }
  }

  return <Pane paddingTop={isAuthorized ? 60 : 0}>
    { getRoutes() }
  </Pane>

}

export default AppRouter