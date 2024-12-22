import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";
import Home from "../../screens/home/Home";
import Login from "../../screens/login/Login";
import Inventory from "../../screens/management/inventory";
import NotFound from "../../screens/notfound";
import { home, inventory, login } from "../../utils/context-paths";
import { inventoryRoutes } from "./inventoryRoutes";

interface RouteObject{
  path: string,
  element: ReactNode,
  children: RouteObject[]
};

const routesConfig: RouteObject[] = [
  {
    path:home, 
    element: <Home /> as React.ReactNode, 
    children: []
  },
  {
    path: login,
    element: <Login /> as React.ReactNode, 
    children: []
  },
  {
    path: inventory,
    element: <Inventory /> as React.ReactNode,
    children: inventoryRoutes
  },
  {
    path: "*", 
    element: <NotFound /> as React.ReactNode, 
    children: []
  }
];

export default routesConfig;
