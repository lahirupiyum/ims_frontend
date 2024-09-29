import { ReactNode } from "react"
import Home from "../screens/home/Home"
import Login from "../screens/login/Login"
import { RouteObject } from "react-router-dom"

const getElement:(path:string, element:ReactNode) => RouteObject = (path, element) => ({path, element})

const routesConfig = {
    home: getElement("/",<Home />),
    login: getElement("/auth/login", <Login />)
}


export default routesConfig;