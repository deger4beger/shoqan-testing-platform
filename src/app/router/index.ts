import React from "react"
import Signin from "../pages/unauthorized/Signin"
import Signup from "../pages/unauthorized/Signup"
import AdminCabinet from "../pages/admin/Cabinet"
import UserCabinet from "../pages/user/Cabinet"

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    SIGNIN = "/signin",
    SIGNUP = "/signup",
    CABINET = "/cabinet"
}

export const unauthorizedRoutes: IRoute[] = [
    {path: RouteNames.SIGNIN, exact: true, component: Signin},
    {path: RouteNames.SIGNUP, exact: true, component: Signup},
]

export const adminRoutes: IRoute[] = [
    {path: RouteNames.CABINET, exact: true, component: AdminCabinet}
]

export const userRoutes: IRoute[] = [
    {path: RouteNames.CABINET, exact: true, component: UserCabinet}
]