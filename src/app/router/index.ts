import React from "react"

import Signin from "../pages/unauthorized/Signin"
import Signup from "../pages/unauthorized/Signup"
import UserCabinet from "../pages/user/Cabinet"
import AllCertificates from "../pages/admin/AllCertificates"
import UploadTests from "../pages/admin/UploadTests"
import MyStudy from "../pages/user/MyStudy"
import MyCertificates from "../pages/user/MyCertificates"

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export enum RouteNames {
    SIGNIN = "/signin",
    SIGNUP = "/signup",
    CABINET = "/cabinet",
    UPLOAD = "/upload",
    CERTIFICATES = "/certificates",
    MYSTUDY = "/study"
}

export const unauthorizedRoutes: IRoute[] = [
    {path: RouteNames.SIGNIN, exact: true, component: Signin},
    {path: RouteNames.SIGNUP, exact: true, component: Signup},
]

export const adminRoutes: IRoute[] = [
    {path: RouteNames.UPLOAD, exact: true, component: UploadTests},
    {path: RouteNames.CERTIFICATES, exact: true, component: AllCertificates}
]

export const userRoutes: IRoute[] = [
    {path: RouteNames.CABINET, exact: true, component: UserCabinet},
    {path: RouteNames.MYSTUDY, exact: true, component: MyStudy},
    {path: RouteNames.CERTIFICATES, exact: true, component: MyCertificates}
]