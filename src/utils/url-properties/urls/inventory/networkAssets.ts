import { getListUrl, getUrl, mergeWithId } from "../../urlGenerator";

export const networkAssetUrl = getUrl("asset/network/");
export const networkAssetListUrl = getListUrl(networkAssetUrl);
export const networkAssetWithIdUrl = (id: number) => mergeWithId(networkAssetUrl, id);