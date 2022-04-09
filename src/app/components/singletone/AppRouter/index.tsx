import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { RouteNames, adminRoutes, unauthorizedRoutes, userRoutes } from "../../../router"

interface AppRouterProps {
  role: "unauthorized" | "user" | "admin"
}

const AppRouter: React.FC<AppRouterProps> = ({role}) => {

  const getRoutes = () => {
    switch (role) {
      case "unauthorized":
        return (
          <Switch>
            {unauthorizedRoutes.map(route =>
              <Route { ...route } key={route.path} />
            )}
            <Redirect to={RouteNames.SIGNIN}/>
          </Switch>
        )
      case "user":
        return (
          <Switch>
            {userRoutes.map(route =>
              <Route { ...route } key={route.path} />
            )}
            <Redirect to={RouteNames.CABINET}/>
          </Switch>
        )
      case "admin":
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