import { getListUrl, getSearchUrl, getUrl } from "../../urlGenerator";

const employeeUrl = getUrl("employee");
export const employeeListUrl = getListUrl(employeeUrl);
export const employeeSearchUrl = getSearchUrl(employeeUrl);