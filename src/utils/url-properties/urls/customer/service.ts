import { getUrl, mergeResources, mergeWithId } from "../../urlGenerator";

const serviceUrl = getUrl("service");
export const connectionUrl = mergeResources(serviceUrl, "connection");
export const illConnectionUrl = mergeResources(connectionUrl, "ill");
export const mplsConnectionUrl = mergeResources(connectionUrl, "mpls");

export const connectionWithIdUrl = (id: number) => mergeWithId(connectionUrl, id);