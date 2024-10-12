import Dashboard from "../../../screens/management/inventory/dashboard";
import FixedAssets from "../../../screens/management/inventory/fixedassets";
import NetworkAssets from "../../../screens/management/inventory/networkassets";
import Devices from "../../../screens/management/inventory/networkassets/devices";
import Manufacturers from "../../../screens/management/inventory/networkassets/manufacturers";
import Models from "../../../screens/management/inventory/networkassets/models";
import Type from "../../../screens/management/inventory/networkassets/types";
import Vendor from "../../../screens/management/inventory/vendors";
import Branch from "../../../screens/management/inventory/branches";

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
} from "../../../utils/context-paths";
import { getPathElement } from "../routesConfig";

const getNetworkRoutes = () => ({
  devices: getPathElement(inventory_network_devices, <Devices />, []),
  manufacturers: getPathElement(
    inventory_network_manufacturers,
    <Manufacturers />,
    []
  ),
  types: getPathElement(inventory_network_types, <Type />, []),
  model: getPathElement(inventory_network_models, <Models />, []),
});

export const getInventoryRoutes = () => ({
  networkAsset: getPathElement(
    inventory_network,
    <NetworkAssets />,
    Object.values(getNetworkRoutes())
  ),
  dashboard: getPathElement(inventory_dashboard, <Dashboard />, []),
  fixedAsset: getPathElement(inventory, <FixedAssets />, []),
  vendors: getPathElement(inventory_vendors, <Vendor />, []),
  branches: getPathElement(inventory_branch, <Branch />, []),
});
