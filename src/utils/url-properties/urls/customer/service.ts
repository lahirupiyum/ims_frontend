import { getUrl, mergeResources, mergeWithId } from "../../urlGenerator";

const serviceUrl = getUrl("service");
export const connectionUrl = mergeResources(serviceUrl, "connection");
export const illConnectionUrl = mergeResources(connectionUrl, "ill");
export const mplsConnectionUrl = mergeResources(connectionUrl, "mpls");

export const connectionWithIdUrl = (id: number) => mergeWithId(connectionUrl, id);

const connectionActivateUrl =  mergeResources(connectionUrl, "activate");
export const connectionActivateWithIdUrl = (id: number) => mergeWithId(connectionActivateUrl, id);