const baseUrl = import.meta.env.VITE_API_BASEURL;

export const getUrl = (resource: string) => baseUrl + resource;
export const mergeResources = (url: string, resource: string) => `${url}/${resource}`;
export const mergeWithId = (url: string, id: number) => `${url}/${id}`
export const getListUrl = (url: string) => `${url}/all`
export const getSearchUrl = (url: string) => `${url}/search`
