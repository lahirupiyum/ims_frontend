import { ReactNode } from "react";
import { RouteObject } from "react-router-dom";

import Dashboard from "../../screens/management/inventory/dashboard/index";
import FixedAssets from "../../screens/management/inventory/fixedassets";
import NetworkAssets from "../../screens/management/inventory/networkassets";
import Devices from "../../screens/management/inventory/networkassets/devices";
import Manufacturers from "../../screens/management/inventory/networkassets/manufacturers";
import Models from "../../screens/management/inventory/networkassets/models";
import Type from "../../screens/management/inventory/networkassets/types";
import Vendor from "../../screens/management/inventory/vendors";
import Branch from "../../screens/management/inventory/branches";

import {
  inventory,
  inventory_branch,
  inventory_dashboard,
  inventory_network,
  inventory_network_devices,
  inventory_network_manufacturers,
  inventory_network_models,
  inventory_network_types,
  inventory_vendors,
} from "../../utils/context-paths/index";

interface RouteObject{
  path: string,
  element: ReactNode,
  children: RouteObject[]
};

const networkRoutes:RouteObject[] = [
  {
    path: inventory_network_devices,
    element: <Devices/> as React.ReactNode,
    children: []
  },
  {
    path: inventory_network_manufacturers,
    element: <Manufacturers/> as React.ReactNode,
    children: []
  },
  {
    path: inventory_network_types,
    element: <Type/> as React.ReactNode,
    children: []
  },
  {
    path: inventory_network_models,
    element: <Models/> as React.ReactNode,
    children: []
  },
];


export const inventoryRoutes:RouteObject[] = [
  {
    path: inventory_dashboard,
    element: <Dashboard/> as React.ReactNode,
    children: []
  },
  {
    path: inventory,
    element: <FixedAssets/> as React.ReactNode,
    children: []
  },
  {
    path:   inventory_vendors,
    element: <Vendor/> as React.ReactNode,
    children: []
  },
  {
    path:   inventory_branch,
    element: <Branch/> as React.ReactNode,
    children: []
  },
  {
    path:   inventory_network,
    element: <NetworkAssets/> as React.ReactNode,
    children: networkRoutes
  },
];
