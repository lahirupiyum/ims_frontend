import { getListUrl, getUrl, mergeResources, mergeWithId } from "../../urlGenerator";

const lastMileUrl = getUrl("last-mile");

const lastMileProviderUrl = mergeResources(lastMileUrl, "provider");
const lastMileMediaUrl = mergeResources(lastMileUrl, "media");
const lastMileConnectionUrl = mergeResources(lastMileUrl, "connection");

export const lastMileProviderListUrl = getListUrl(lastMileProviderUrl);
export const lastMileMediaListUrl = getListUrl(lastMileMediaUrl);

export const lastMileConnectionWithIdUrl = (id: number) => mergeWithId(lastMileConnectionUrl, id);