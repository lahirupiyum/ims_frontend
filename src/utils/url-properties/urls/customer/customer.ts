import {
  getListUrl,
  getSearchUrl,
  getUrl,
  mergeWithId,
} from "../../urlGenerator";

export const customerUrl = getUrl("customer");
export const customerWithIdUrl = (id: number) => mergeWithId(customerUrl, id);

export const customerListUrl = getListUrl(customerUrl);
export const customerSearchUrl = getSearchUrl(customerUrl);
