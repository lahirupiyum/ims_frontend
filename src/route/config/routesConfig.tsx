import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";
import Home from "../../screens/home/Home";
import Login from "../../screens/login/Login";
import Inventory from "../../screens/management/inventory";
import { home, inventory, login } from "../../utils/context-paths";
import { getInventoryRoutes } from "./inventory/inventoryRoutes";
import NotFound from "../../screens/notfound";

export const getPathElement: (
  path: string,
  element: ReactNode,
  children: RouteObject[]
) => RouteObject = (path, element, children) => ({ path, element, children });

const getRoutesConfig = () => ({
  home: getPathElement(home, <Home />, []),
  login: getPathElement(login, <Login />, []),
  inventory: getPathElement(
    inventory,
    <Inventory />,
    Object.values(getInventoryRoutes())
  ),
  notfound: getPathElement("*", <NotFound />, [])
});

export default getRoutesConfig;
