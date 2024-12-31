import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";

import MobileAssests from "../../screens/management/inventory/mobileassets/index";
import FixedAssets from "../../screens/management/inventory/fixedassets/index";
import NetworkAssets from "../../screens/management/inventory/networkassets";
import Vendor from "../../screens/management/inventory/vendors";
import Manufacturers from "../../screens/management/inventory/manufacturers/index";

import {
  inventory_fixed,
  inventory_manufacturers,
  inventory_mobileassets,
  inventory_network,
  inventory_vendors,
} from "../../utils/context-paths/index";

interface RouteObject{
  path: string,
  element: ReactNode,
  children: RouteObject[]
};


export const inventoryRoutes:RouteObject[] = [
  {
    path: inventory_mobileassets,
    element: <MobileAssests/> as React.ReactNode,
    children: []
  },
  {
    path: inventory_fixed,
    element: <FixedAssets/> as React.ReactNode,
    children: []
  },
  {
    path:   inventory_vendors,
    element: <Vendor/> as React.ReactNode,
    children: []
  },
  {
    path:   inventory_manufacturers,
    element: <Manufacturers/> as React.ReactNode,
    children: []
  },
  {
    path:   inventory_network,
    element: <NetworkAssets/> as React.ReactNode,
    children: []
  },
];
