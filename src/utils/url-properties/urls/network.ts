import { getUrl, mergeResources, mergeWithId } from "../urlGenerator";

const networkUrl = getUrl("asset/network/");

export const networkDeviceUrl = networkUrl + "device";
export const networkDeviceWithIdUrl = (id:number) => mergeWithId(networkDeviceUrl, id);

export const networkDeviceManufacturerUrl = mergeResources(networkDeviceUrl, "manufacturer");
export const networkDeviceManufacturerWithIdUrl = (id: number) => mergeWithId(networkDeviceManufacturerUrl, id);

export const networkDeviceTypeUrl = mergeResources(networkDeviceUrl, "type");
export const networkDeviceTypeWithIdUrl = (id: number) => mergeWithId(networkDeviceTypeUrl, id);


export const networkDeviceModelUrl = mergeResources(networkDeviceUrl, "model");
export const networkDeviceModelWithIdUrl = (id: number) => mergeWithId(networkDeviceModelUrl, id);
