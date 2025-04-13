import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit"

type SearchPageSliceActionType<T> = {
    request: ActionCreatorWithoutPayload<`${string}/searchRequest`>
    success: ActionCreatorWithPayload<T[], `${string}/searchSuccess`>
    reject: ActionCreatorWithPayload<string, `${string}/reject`>
}

export default SearchPageSliceActionType;