import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { RouteNames, adminRoutes, unauthorizedRoutes, userRoutes } from "../../../router"

interface AppRouterProps {
  isAdmin: null | boolean
}

const AppRouter: React.FC<AppRouterProps> = ({ isAdmin }) => {

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
            <Redirect to={RouteNames.CABINET}/>
          </Switch>
        )
      default:
        return "Some error occured"
    }
  }

  return <>
    { getRoutes() }
  </>

}

export default AppRouter