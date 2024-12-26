import { getUrl, mergeResources } from "../../urlGenerator";

const routerUrl = getUrl("router");

export const cusRouterUrl = mergeResources(routerUrl, "customer");