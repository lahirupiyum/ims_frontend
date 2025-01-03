import { getListUrl, getUrl, mergeWithId } from "../../urlGenerator";

export const fixedAssetUrl = getUrl("asset/fixedassest/");
export const fixedAssetListUrl = getListUrl(fixedAssetUrl);
export const fixedAssetWithIdUrl = (id: number) => mergeWithId(fixedAssetUrl, id);