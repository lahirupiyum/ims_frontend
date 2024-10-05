import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";
import Inventory from "../../screens/management/inventory";
import Home from "../../screens/home/Home";
import Login from "../../screens/login/Login";
import { inventoryRoutes } from './inventory/inventoryRoutes';

export const getChildren = <T,>(routes: T): RouteObject[] => {
    return Object.values(routes);
}

export const getPathElement: (
    path: string,
    element: ReactNode,
    children: RouteObject[]
  ) => RouteObject = (path, element, children) => ({ path, element, children });


const getRoutesConfig = () => ({
    home: getPathElement("/", <Home />, []),
    login: getPathElement("auth/login", <Login />, []),
    inventory: getPathElement(
      "inventory",
      <Inventory />,
      getChildren(inventoryRoutes)
    ),
  });

  export default getRoutesConfig;