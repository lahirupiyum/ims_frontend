import { getListUrl, getUrl, mergeResources } from "../../urlGenerator";

const lastMileUrl = getUrl("last-mile");

const lastMileProviderUrl = mergeResources(lastMileUrl, "provider");
const lastMileMediaUrl = mergeResources(lastMileUrl, "media");

export const lastMileProviderListUrl = getListUrl(lastMileProviderUrl);
export const lastMileMediaListUrl = getListUrl(lastMileMediaUrl);