import React, { lazy } from "react"

const Signin = lazy(() => import("../pages/unauthorized/Signin"))
const Signup = lazy(() => import("../pages/unauthorized/Signup"))
const UserCabinet = lazy(() => import("../pages/user/Cabinet"))
const AllCertificates = lazy(() => import("../pages/admin/AllCertificates"))
const UploadTests = lazy(() => import("../pages/admin/UploadTests"))
const MyStudy = lazy(() => import("../pages/user/MyStudy"))
const MyCertificates = lazy(() => import("../pages/user/MyCertificates"))

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