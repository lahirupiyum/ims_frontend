import { getListUrl, getSearchUrl, getUrl, mergeResources, mergeWithId } from "../../urlGenerator";

export const mobileAssetUrl = getUrl("asset/mobile");
export const mobileAssetListUrl = getListUrl(mobileAssetUrl);
export const mobileAssetSearchUrl = getSearchUrl(mobileAssetUrl);

export const mobileAssetWithIdUrl = (id: number) => mergeWithId(mobileAssetUrl, id);

export const mobileAssetManufacturerListUrl = getListUrl(mergeResources(mobileAssetUrl, "manufacturer"));
export const mobileAssetTypeListUrl = getListUrl(mergeResources(mobileAssetUrl, "type"));
export const mobileAssetModelListUrl = getListUrl(mergeResources(mobileAssetUrl, "model"));
export const mobileAssetStatusListUrl = getListUrl(mergeResources(mobileAssetUrl, "status"));