import { Action } from "@ngrx/store";

import { Response } from "../../../../model/model";


export enum TemplateActionTypes {

    UPDATE_STATUS = "[TEMPLATE] Update Status",
    UPDATE_STATUS_SUCCESS = "[TEMPLATE]  Update Status Success",
    UPDATE_STATUS_FAIL = "[TEMPLATE]  Update Status Fail",

    LOAD_TEMPLATE = "[TEMPLATE] Load TEMPLATE",
    LOAD_TEMPLATE_SUCCESS = "[TEMPLATE] Load TEMPLATE Success",
    LOAD_TEMPLATE_FAIL = "[TEMPLATE] Load TEMPLATE Fail",

    UPDATE_TEMPLATE = "[TEMPLATE] Update TEMPLATE",
    UPDATE_TEMPLATE_SUCCESS = "[TEMPLATE] Update TEMPLATE Success",
    UPDATE_TEMPLATE_FAIL = "[TEMPLATE] Update TEMPLATE Fail",

    DELETE_TEMPLATE = "[TEMPLATE] Delete TEMPLATE",
    DELETE_TEMPLATE_SUCCESS = "[TEMPLATE] Delete TEMPLATE Success",
    DELETE_TEMPLATE_FAIL = "[TEMPLATE] Delete TEMPLATE Fail",

    ADD_TEMPLATE = "[TEMPLATE] Upload Data",
    ADD_TEMPLATE_SUCCESS = "[TEMPLATE] Upload Data Success",
    ADD_TEMPLATE_FAIL = "[TEMPLATE] Upload Data Fail",
}

export class LoadTemplate implements Action {
    readonly type = TemplateActionTypes.LOAD_TEMPLATE;

    constructor(public payload: any) { }
}

export class LoadTemplateSuccess implements Action {
    readonly type = TemplateActionTypes.LOAD_TEMPLATE_SUCCESS;

    constructor(public payload: Response) { }
}

export class LoadTemplateFail implements Action {
    readonly type = TemplateActionTypes.LOAD_TEMPLATE_FAIL;

    constructor(public payload: any) { }
}

export class UpdateTemplate implements Action {
    readonly type = TemplateActionTypes.UPDATE_TEMPLATE;

    constructor(public payload: any) { }
}

export class UpdateTemplateSuccess implements Action {
    readonly type = TemplateActionTypes.UPDATE_TEMPLATE_SUCCESS;

    constructor(public payload: Response) { }
}

export class UpdateTemplateFail implements Action {
    readonly type = TemplateActionTypes.UPDATE_TEMPLATE_FAIL;

    constructor(public payload: any) { }
}

export class DeleteTemplate implements Action {
    readonly type = TemplateActionTypes.DELETE_TEMPLATE;

    constructor(public payload: any) { }
}

export class DeleteTemplateSuccess implements Action {
    readonly type = TemplateActionTypes.DELETE_TEMPLATE_SUCCESS;

    constructor(public payload: Response) { }
}

export class DeleteTemplateFail implements Action {
    readonly type = TemplateActionTypes.DELETE_TEMPLATE_FAIL;

    constructor(public payload: any) { }
}


export class UpdateStatus implements Action {
    readonly type = TemplateActionTypes.UPDATE_STATUS;

    constructor(public payload: any) { }
}

export class UpdateStatusSuccess implements Action {
    readonly type = TemplateActionTypes.UPDATE_STATUS_SUCCESS;

    constructor(public payload: Response) { }
}

export class UpdateStatusFail implements Action {
    readonly type = TemplateActionTypes.UPDATE_STATUS_FAIL;

    constructor(public payload: any) { }
}


export class AddTemplate implements Action {
    readonly type = TemplateActionTypes.ADD_TEMPLATE;

    constructor(public payload: any) { }
}

export class AddTemplateSuccess implements Action {
    readonly type = TemplateActionTypes.ADD_TEMPLATE_SUCCESS;

    constructor(public payload: Response) { }
}

export class AddTemplateFail implements Action {
    readonly type = TemplateActionTypes.ADD_TEMPLATE_FAIL;

    constructor(public payload: any) { }
}


export type action =
    | LoadTemplate
    | LoadTemplateSuccess
    | LoadTemplateFail
    | UpdateTemplate
    | UpdateTemplateSuccess
    | UpdateTemplateFail
    | DeleteTemplate
    | DeleteTemplateSuccess
    | DeleteTemplateFail
    | UpdateStatus
    | UpdateStatusSuccess
    | UpdateStatusFail
    | AddTemplate
    | AddTemplateSuccess
    | AddTemplateFail
