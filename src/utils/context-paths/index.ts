const mergeUrl = (defaultPath: string, path: string) => {
  return `${defaultPath}/${path}`;
};

export const login = "/auth/login";
export const home = "/";

export const inventory = "/inventory";
export const inventory_dashboard = mergeUrl(inventory, "dashboard");
const inventory_assets = mergeUrl(inventory, "asset");

// network context paths
export const inventory_network = mergeUrl(inventory_assets, "network");
export const inventory_network_devices = mergeUrl(inventory_network, "devices");
export const inventory_network_manufacturers = mergeUrl(
  inventory_network,
  "manufacturers"
);
export const inventory_network_models = mergeUrl(inventory_network, "models");
export const inventory_network_types = mergeUrl(inventory_network, "types");

// fixed assets context paths
export const inventory_fixed = mergeUrl(inventory_assets, "fixed");

export const inventory_vendors = mergeUrl(inventory, "vendors");
export const inventory_branch = mergeUrl(inventory, "branches");

export const customer = "/customer";
export const customer_connection = mergeUrl(customer, "connection");
export const customer_peRouters = mergeUrl(customer, "pe-routers");
export const customer_routers = mergeUrl(customer, "routers");
export const customer_customer = mergeUrl(customer, "customer");