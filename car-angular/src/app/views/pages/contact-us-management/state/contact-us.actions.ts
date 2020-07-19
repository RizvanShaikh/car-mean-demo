import { Action } from "@ngrx/store";

import { Response } from "../../../../model/model";


export enum ContactUsActionTypes {

    UPDATE_STATUS = "[ContactUs] Update Status",
    UPDATE_STATUS_SUCCESS = "[ContactUs]  Update Status Success",
    UPDATE_STATUS_FAIL = "[ContactUs]  Update Status Fail",

    LOAD_CONTACTUS = "[ContactUs] Load Contact Us",
    LOAD_CONTACTUS_SUCCESS = "[ContactUs] Load Contact Us Success",
    LOAD_CONTACTUS_FAIL = "[ContactUs] Load ContactUs Fail",

    UPDATE_CONTACTUS = "[ContactUs] Update Contact Us",
    UPDATE_CONTACTUS_SUCCESS = "[ContactUs] Update Contact Us Success",
    UPDATE_CONTACTUS_FAIL = "[ContactUs] Update Contact Us Fail",

    DELETE_CONTACTUS = "[ContactUs] Delete Contact Us",
    DELETE_CONTACTUS_SUCCESS = "[ContactUs] Delete Contact Us Success",
    DELETE_CONTACTUS_FAIL = "[ContactUs] Delete Contact Us Fail",

    ADD_CONTACTUS = "[ContactUs] Add Contact Us",
    ADD_CONTACTUS_SUCCESS = "[ContactUs] Add Contact Us Success",
    ADD_CONTACTUS_FAIL = "[ContactUs] Add Contact Us Fail",
}

export class LoadContactUs implements Action {
    readonly type = ContactUsActionTypes.LOAD_CONTACTUS;

    constructor(public payload: any) { }
}

export class LoadContactUsSuccess implements Action {
    readonly type = ContactUsActionTypes.LOAD_CONTACTUS_SUCCESS;

    constructor(public payload: Response) { }
}

export class LoadContactUsFail implements Action {
    readonly type = ContactUsActionTypes.LOAD_CONTACTUS_FAIL;

    constructor(public payload: any) { }
}

export class UpdateContactUs implements Action {
    readonly type = ContactUsActionTypes.UPDATE_CONTACTUS;

    constructor(public payload: any) { }
}

export type action =
    | LoadContactUs
    | LoadContactUsSuccess
    | LoadContactUsFail
    | UpdateContactUs
 