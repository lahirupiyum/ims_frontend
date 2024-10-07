import { ActionCreatorWithPayload } from "@reduxjs/toolkit"

export type CreateActions <T> = {
    request: ActionCreatorWithPayload<void, `${string}/request`>
    success: ActionCreatorWithPayload<T, `${string}/success`>
    reject: ActionCreatorWithPayload<string, `${string}/reject`>
}

const createAction = <RequestType, ResponseType>(data:RequestType, url:string, createAction:CreateActions<ResponseType>) => {

}