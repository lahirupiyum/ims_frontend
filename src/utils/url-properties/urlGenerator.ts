const baseUrl = "http://localhost:8081/api/v1/";

export const getUrl = (resource: string) => baseUrl + resource;
export const mergeResources = (url: string, resource: string) => `${url}/${resource}`;
export const mergeWithId = (url: string, id: number) => `${url}/${id}`
export const getListUrl = (url: string) => `${url}/all`
