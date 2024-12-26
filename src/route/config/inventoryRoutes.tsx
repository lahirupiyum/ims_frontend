import { RouteObject } from "react-router-dom";

import Dashboard from "../../screens/management/inventory/dashboard/index";
import FixedAssets from "../../screens/management/inventory/fixedassets";
import NetworkAssets from "../../screens/management/inventory/networkassets";
import Vendor from "../../screens/management/inventory/vendors";

import {
  inventory,
  inventory_dashboard,
  inventory_network,
  inventory_vendors,
} from "../../utils/context-paths/index";

export const inventoryRoutes: RouteObject[] = [
  {
    path: inventory_dashboard,
    element: <Dashboard />,
  },
  {
    path: inventory,
    element: <FixedAssets />,
  },
  {
    path: inventory_network,
    element: <NetworkAssets />,
  },
  {
    path: inventory_vendors,
    element: <Vendor />,
  },
];
