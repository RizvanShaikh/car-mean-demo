import { Action } from "@ngrx/store";

import { Response } from "../../../../model/model";


export enum ProviderActionTypes {

    UPDATE_STATUS = "[PROVIDER] Update Status",
    UPDATE_STATUS_SUCCESS = "[PROVIDER]  Update Status Success",
    UPDATE_STATUS_FAIL = "[PROVIDER]  Update Status Fail",

    LOAD_PROVIDER = "[PROVIDER] Load PROVIDER",
    LOAD_PROVIDER_SUCCESS = "[PROVIDER] Load PROVIDER Success",
    LOAD_PROVIDER_FAIL = "[PROVIDER] Load PROVIDER Fail",

    UPDATE_PROVIDER = "[PROVIDER] Update PROVIDER",
    UPDATE_PROVIDER_SUCCESS = "[PROVIDER] Update PROVIDER Success",
    UPDATE_PROVIDER_FAIL = "[PROVIDER] Update PROVIDER Fail",

    DELETE_PROVIDER = "[PROVIDER] Delete PROVIDER",
    DELETE_PROVIDER_SUCCESS = "[PROVIDER] Delete PROVIDER Success",
    DELETE_PROVIDER_FAIL = "[PROVIDER] Delete PROVIDER Fail",

    ADD_PROVIDER = "[PROVIDER] Upload Data",
    ADD_PROVIDER_SUCCESS = "[PROVIDER] Upload Data Success",
    ADD_PROVIDER_FAIL = "[PROVIDER] Upload Data Fail",

    UPLOAD_DATA = "[PROVIDER] Upload Data",
    UPLOAD_DATA_SUCCESS = "[PROVIDER] Upload Data Success",
    UPLOAD_DATA_FAIL = "[PROVIDER] Upload Data Fail",
}

export class LoadProvider implements Action {
    readonly type = ProviderActionTypes.LOAD_PROVIDER;

    constructor(public payload: any) { }
}

export class LoadProviderSuccess implements Action {
    readonly type = ProviderActionTypes.LOAD_PROVIDER_SUCCESS;

    constructor(public payload: Response) { }
}

export class LoadProviderFail implements Action {
    readonly type = ProviderActionTypes.LOAD_PROVIDER_FAIL;

    constructor(public payload: any) { }
}

export class UpdateProvider implements Action {
    readonly type = ProviderActionTypes.UPDATE_PROVIDER;

    constructor(public payload: any) { }
}

export class UpdateProviderSuccess implements Action {
    readonly type = ProviderActionTypes.UPDATE_PROVIDER_SUCCESS;

    constructor(public payload: Response) { }
}

export class UpdateProviderFail implements Action {
    readonly type = ProviderActionTypes.UPDATE_PROVIDER_FAIL;

    constructor(public payload: any) { }
}

export class DeleteProvider implements Action {
    readonly type = ProviderActionTypes.DELETE_PROVIDER;

    constructor(public payload: any) { }
}

export class DeleteProviderSuccess implements Action {
    readonly type = ProviderActionTypes.DELETE_PROVIDER_SUCCESS;

    constructor(public payload: Response) { }
}

export class DeleteProviderFail implements Action {
    readonly type = ProviderActionTypes.DELETE_PROVIDER_FAIL;

    constructor(public payload: any) { }
}


export class UpdateStatus implements Action {
    readonly type = ProviderActionTypes.UPDATE_STATUS;

    constructor(public payload: any) { }
}

export class UpdateStatusSuccess implements Action {
    readonly type = ProviderActionTypes.UPDATE_STATUS_SUCCESS;

    constructor(public payload: Response) { }
}

export class UpdateStatusFail implements Action {
    readonly type = ProviderActionTypes.UPDATE_STATUS_FAIL;

    constructor(public payload: any) { }
}


export class AddProvider implements Action {
    readonly type = ProviderActionTypes.ADD_PROVIDER;

    constructor(public payload: any) { }
}

export class AddProviderSuccess implements Action {
    readonly type = ProviderActionTypes.ADD_PROVIDER_SUCCESS;

    constructor(public payload: Response) { }
}

export class AddProviderFail implements Action {
    readonly type = ProviderActionTypes.ADD_PROVIDER_FAIL;

    constructor(public payload: any) { }
}


export type action =
    | LoadProvider
    | LoadProviderSuccess
    | LoadProviderFail
    | UpdateProvider
    | UpdateProviderSuccess
    | UpdateProviderFail
    | DeleteProvider
    | DeleteProviderSuccess
    | DeleteProviderFail
    | UpdateStatus
    | UpdateStatusSuccess
    | UpdateStatusFail
    | AddProvider
    | AddProviderSuccess
    | AddProviderFail

