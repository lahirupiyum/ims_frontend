import { getUrl, mergeWithId } from "../urlGenerator";

export const branchUrl = getUrl("branch");
export const branchWithIdUrl = (id: number) => mergeWithId(branchUrl, id);