import { getListUrl, getUrl, mergeResources, mergeWithId } from "../../urlGenerator";

export const fixedAssetUrl = getUrl("asset/fixed");
export const fixedAssetListUrl = getListUrl(fixedAssetUrl);
export const fixedAssetWithIdUrl = (id: number) => mergeWithId(fixedAssetUrl, id);

export const fixedAssetManufacturerListUrl = getListUrl(mergeResources(fixedAssetUrl, "manufacturer"));
export const fixedAssetTypeListUrl = getListUrl(mergeResources(fixedAssetUrl, "type"));
export const fixedAssetModelListUrl = getListUrl(mergeResources(fixedAssetUrl, "model"));
export const fixedAssetStatusListUrl = getListUrl(mergeResources(fixedAssetUrl, "status"));