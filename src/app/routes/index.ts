import React from "react";
import { Signin, Signup } from "../pages/unauthorized";

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    SIGNIN = '/signin',
    SIGNUP = "/signup",
}

export const unauthorizedRoutes: IRoute[] = [
    {path: RouteNames.SIGNIN, exact: true, component: Signin},
    {path: RouteNames.SIGNUP, exact: true, component: Signup},
]

// export const adminRoutes: IRoute[] = [
//     {path: RouteNames.HOME, exact: true, component: Home}
// ]

// export const userRoutes: IRoute[] = [
//     {path: RouteNames.HOME, exact: true, component: Home}
// ]