import { RouteObject } from "react-router-dom";

import FixedAssets from "../../screens/management/inventory/fixedassets/index";
import Manufacturers from "../../screens/management/inventory/manufacturers/index";
import MobileAssests from "../../screens/management/inventory/mobileassets/index";
import NetworkAssets from "../../screens/management/inventory/networkassets";
import Vendor from "../../screens/management/inventory/vendors";

import {
  inventory_fixed,
  inventory_manufacturers,
  inventory_mobileassets,
  inventory_network,
  inventory_vendors
} from "../../utils/context-paths/index";


export const inventoryRoutes: RouteObject[] = [
  {
    path: inventory_mobileassets,
    element: <MobileAssests/>,
  },
  {
    path: inventory_fixed,
    element: <FixedAssets/>,
  },
  {
    path:   inventory_vendors,
    element: <Vendor/> 
  },
  {
    path:   inventory_manufacturers,
    element: <Manufacturers/>
  },
  {
    path:   inventory_network,
    element: <NetworkAssets/>
  },
];
