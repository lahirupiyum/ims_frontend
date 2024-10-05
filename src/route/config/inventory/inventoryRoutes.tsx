import Dashboard from "../../../screens/management/inventory/dashboard";
import FixedAssets from "../../../screens/management/inventory/fixedassets";
import NetworkAssets from "../../../screens/management/inventory/networkassets";
import Devices from "../../../screens/management/inventory/networkassets/devices";
import Manufacturers from "../../../screens/management/inventory/networkassets/manufacturers";
import Models from "../../../screens/management/inventory/networkassets/models";
import Type from "../../../screens/management/inventory/networkassets/types";
import { getChildren, getPathElement } from "../routesConfig";

const networkRoutes = {
  devices: getPathElement("devices", <Devices />, []),
  manufacturers: getPathElement("manufacturers", <Manufacturers />, []),
  types: getPathElement("types", <Type />, []),
  model: getPathElement("models", <Models />, []),
}

export const inventoryRoutes = {
  networkAsset: getPathElement("asset/network", <NetworkAssets />, getChildren(networkRoutes)),
  dashboard: getPathElement("dashboard", <Dashboard />, []),
  fixedAsset: getPathElement("asset/fixed", <FixedAssets />, [])
};
