import { getListUrl, getUrl, mergeWithId } from "../../urlGenerator";

export const vendorUrl = getUrl("vendor");
export const vendorWithIdUrl = (id: number) => mergeWithId(vendorUrl, id);

export const vendorListUrl = getListUrl(vendorUrl);