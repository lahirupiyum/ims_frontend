import Home from "./screens/home/Home";
import Login from './screens/login/Login';

interface Route {
    path: string;
    component: React.ElementType;
}

export const routesList:Route[] = [
    {
        path:"",
        component:Home
    },
    {
        path:"auth/login",
        component: Login
    }
]