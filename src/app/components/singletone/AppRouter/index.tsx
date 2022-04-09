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
          <>
            {unauthorizedRoutes.map(route =>
              <Route { ...route } key={route.path} />
            )}
            <Redirect to={RouteNames.SIGNIN}/>
          </>
        )
      case "user":
        return (
          <>
            {userRoutes.map(route =>
              <Route { ...route } key={route.path} />
            )}
            <Redirect to={RouteNames.CABINET}/>
          </>
        )
      case "admin":
        return (
          <>
            {adminRoutes.map(route =>
              <Route { ...route } key={route.path} />
            )}
            <Redirect to={RouteNames.CABINET}/>
          </>
        )
      default:
        return "Some error occured"
    }
  }

  return (
    <Switch>
      { getRoutes() }
    </Switch>
  )

}

export default AppRouter