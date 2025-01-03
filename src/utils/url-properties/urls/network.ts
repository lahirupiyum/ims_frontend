import { getListUrl, getUrl, mergeResources, mergeWithId } from "../urlGenerator";

export const networkAssetUrl = getUrl("asset/network/");
export const networkAssetListUrl = getListUrl(networkAssetUrl);
export const networkAssetWithIdUrl = (id: number) => mergeWithId(networkAssetUrl, id);

export const networkDeviceUrl = networkAssetUrl + "device";
export const networkDeviceWithIdUrl = (id:number) => mergeWithId(networkDeviceUrl, id);

export const networkDeviceManufacturerUrl = mergeResources(networkDeviceUrl, "manufacturer");
export const networkDeviceManufacturerWithIdUrl = (id: number) => mergeWithId(networkDeviceManufacturerUrl, id);
export const networkDeviceManufacturerListUrl = getListUrl(networkDeviceManufacturerUrl);

export const networkDeviceTypeUrl = mergeResources(networkDeviceUrl, "type");
export const networkDeviceTypeWithIdUrl = (id: number) => mergeWithId(networkDeviceTypeUrl, id);
export const networkDeviceTypeListUrl = getListUrl(networkDeviceTypeUrl);


export const networkDeviceModelUrl = mergeResources(networkDeviceUrl, "model");
export const networkDeviceModelWithIdUrl = (id: number) => mergeWithId(networkDeviceModelUrl, id);
export const networkDeviceModelListUrl = getListUrl(networkDeviceModelUrl);

export const networkDeviceStatusUrl = mergeResources(networkDeviceUrl, "status");
export const networkDeviceStatusListUrl = getListUrl(networkDeviceStatusUrl);