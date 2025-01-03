const mergeUrl = (defaultPath: string, path: string) => {
  return `${defaultPath}/${path}`;
};

export const login = "/auth/login";
export const home = "/";

export const inventory = "/inventory";
export const inventory_mobileassets = mergeUrl(inventory, "mobileassests");

// network context paths
export const inventory_network = mergeUrl(inventory, "network");

// fixed assets context paths
export const inventory_fixed = mergeUrl(inventory, "fixed");

export const inventory_vendors = mergeUrl(inventory, "vendors");
export const inventory_manufacturers = mergeUrl(inventory, "manufacturers");
