import { getListUrl, getSearchUrl, getUrl } from "../../urlGenerator";

export const customerUrl = getUrl("customer");
export const customerListUrl = getListUrl(customerUrl);
export const customerSearchUrl = getSearchUrl(customerUrl);