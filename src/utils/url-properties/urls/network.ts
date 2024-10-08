import { getUrl, mergeResources } from "../urlGenerator";

const networkUrl = getUrl("asset/network/");

export const networkDeviceUrl = networkUrl + "device";

export const networkDeviceManufacturerUrl = mergeResources(networkDeviceUrl, "manufacturer");
export const networkDeviceTypeUrl = mergeResources(networkDeviceUrl, "type");
