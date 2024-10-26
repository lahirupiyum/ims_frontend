import { getUrl, mergeResources, mergeWithId } from "../urlGenerator";

const networkUrl = getUrl("asset/network/");

export const networkDeviceUrl = networkUrl + "device";

export const networkDeviceManufacturerUrl = mergeResources(networkDeviceUrl, "manufacturer");
export const networkDeviceTypeUrl = mergeResources(networkDeviceUrl, "type");
export const networkDeviceTypeWithIdUrl = (id: number) => mergeWithId(networkDeviceTypeUrl, id);


export const networkDeviceModelUrl = mergeResources(networkUrl, "model");
