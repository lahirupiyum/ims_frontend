import App from "./App"
import Login from './screens/login/Login'

interface Route {
    path: string;
    component: React.ComponentType;
}

export const routesList:Route[] = [
    {
        path:"hello",
        component:App
    },
    {
        path:"auth/login",
        component: Login
    }
]