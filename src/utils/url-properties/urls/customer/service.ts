import { getUrl, mergeResources } from "../../urlGenerator";

const serviceUrl = getUrl("service");
export const connectionUrl = mergeResources(serviceUrl, "connection");
export const illConnectionUrl = mergeResources(connectionUrl, "ill");
export const mplsConnectionUrl = mergeResources(connectionUrl, "mpls");