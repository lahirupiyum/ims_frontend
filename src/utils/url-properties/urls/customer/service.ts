import { getUrl, mergeResources } from "../../urlGenerator";

const serviceUrl = getUrl("service");
export const connectionUrl = mergeResources(serviceUrl, "connection");