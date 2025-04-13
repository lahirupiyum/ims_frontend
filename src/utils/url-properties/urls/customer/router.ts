import { getUrl, mergeResources, mergeWithId } from "../../urlGenerator";

const routerUrl = getUrl("router");

export const cusRouterUrl = mergeResources(routerUrl, "customer");
export const cusRouterwithIdUrl = (id: number) => mergeWithId(cusRouterUrl, id);


export const peRouterUrl = mergeResources(routerUrl, "provider-edge");
export const peRouterWithIdUrl = (id: number) => mergeWithId(peRouterUrl, id);

const routerFirewallCredentialsUrl = mergeResources(routerUrl, "firewall-credentials");
export const firewallCredentialsWithIdUrl = (id: number) => mergeWithId(routerFirewallCredentialsUrl, id);