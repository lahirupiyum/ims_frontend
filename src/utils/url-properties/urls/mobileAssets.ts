import { getListUrl, getUrl, mergeWithId } from "../urlGenerator";

export const mobileAssetUrl = getUrl("asset/mobileassets/");
export const mobileAssetListUrl = getListUrl(mobileAssetUrl);

export const mobileAssetWithIdUrl = (id: number) => mergeWithId(mobileAssetUrl, id);