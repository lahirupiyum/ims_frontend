import { getSearchUrl, getUrl } from "../../urlGenerator";

const employeeUrl = getUrl("employee");
export const employeeSearchUrl = getSearchUrl(employeeUrl);