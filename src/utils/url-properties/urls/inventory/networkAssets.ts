import {
  getListUrl,
  getSearchUrl,
  getUrl,
  mergeResources,
  mergeWithId,
} from "../../urlGenerator";

export const networkAssetUrl = getUrl("asset/network");
export const networkAssetListUrl = getListUrl(networkAssetUrl);
export const networkAssetWithIdUrl = (id: number) =>
  mergeWithId(networkAssetUrl, id);
export const networkAssetSearchUrl = getSearchUrl(networkAssetUrl);

export const peRouterListUrl =  getListUrl(mergeResources(networkAssetUrl, "pe-router"));
export const routerSearchUrl = getSearchUrl(mergeResources(networkAssetUrl, "router"));
export const routerListUrl = getListUrl(mergeResources(networkAssetUrl, "router"));
export const switchSearchUrl = getSearchUrl(mergeResources(networkAssetUrl, "switch"));
export const switchListUrl = getListUrl(mergeResources(networkAssetUrl, "switch"));

export const networkAssetManufacturerListUrl = getListUrl(mergeResources(networkAssetUrl, "manufacturer"));
export const networkAssetTypeListUrl = getListUrl(mergeResources(networkAssetUrl, "type"));
export const networkAssetModelListUrl = getListUrl(mergeResources(networkAssetUrl, "model"));
export const networkAssetStatusListUrl = getListUrl(mergeResources(networkAssetUrl, "status"));