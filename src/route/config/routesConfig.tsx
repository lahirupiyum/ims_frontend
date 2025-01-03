import { RouteObject } from "react-router-dom";
import Home from "../../screens/home/Home";
import Login from "../../screens/login/Login";
import CustomerManagement from "../../screens/management/customer";
import Inventory from "../../screens/management/inventory";
import NotFound from "../../screens/notfound";
import { customer, home, inventory, login } from "../../utils/context-paths";
import customerRoutes from "./customerRoutes";
import { inventoryRoutes } from "./inventoryRoutes";


const routesConfig: RouteObject[] = [
  {
    path:home, 
    element: <Home />
  },
  {
    path: login,
    element: <Login />
  },
  {
    path: inventory,
    element: <Inventory /> as React.ReactNode,
    children: inventoryRoutes
  },
  {
    path: customer,
    element: <CustomerManagement />,
    children: customerRoutes
  },
  {
    path: "*", 
    element: <NotFound />
  }
];

export default routesConfig;
