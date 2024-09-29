import { ReactNode } from "react";
import Home from "../screens/home/Home";
import Login from "../screens/login/Login";
import { RouteObject } from "react-router-dom";
import Dashboard from "../screens/management/inventory/Dashboard";
import Inventory from "../screens/management/inventory";

const getElement: (
  path: string,
  element: ReactNode,
  children: RouteObject[]
) => RouteObject = (path, element, children) => ({ path, element, children });

export const inventoryChildren = {
  dashboard: getElement("dashboard", <Dashboard />, []),
};

const routesConfig = {
  home: getElement("/", <Home />, []),
  login: getElement("auth/login", <Login />, []),
  inventory: getElement(
    "inventory",
    <Inventory />,
    Object.values(inventoryChildren)
  ),
};

export default routesConfig;
