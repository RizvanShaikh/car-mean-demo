import * as adminActions from "./admin.actions";

import { createFeatureSelector, createSelector } from "@ngrx/store";


export const initialState = [];

export function adminReducer(
    state = initialState,
    action: adminActions.action
) {
    switch (action.type) {

        // for student upadate-----------------------------
        case adminActions.AdminActionTypes.UPLOAD_DATA_SUCCESS: {
            return action.payload
        }
        case adminActions.AdminActionTypes.UPLOAD_DATA_FAIL: {
            return action.payload.error;
        }


        case adminActions.AdminActionTypes.LOAD_ADMIN_SUCCESS: {
            return action.payload;
        }
        case adminActions.AdminActionTypes.LOAD_ADMIN_FAIL: {
            return action.payload.error;
        }

        case adminActions.AdminActionTypes.CREATE_ADMIN_SUCCESS: {
            return action.payload;
        }

        case adminActions.AdminActionTypes.CREATE_ADMIN_FAIL: {
            return action.payload.error
        }

        case adminActions.AdminActionTypes.DELETE_ADMIN_SUCCESS: {

            return action.payload;
        }

        case adminActions.AdminActionTypes.DELETE_ADMIN_FAIL: {
            return action.payload.error
        }

        case adminActions.AdminActionTypes.UPDATE_ADMIN_SUCCESS: {
            return action.payload
        }
        case adminActions.AdminActionTypes.UPDATE_ADMIN_FAIL: {
            return action.payload.error;
        }

        case adminActions.AdminActionTypes.UPDATE_STATUS_SUCCESS: {
            return action.payload
        }
        case adminActions.AdminActionTypes.UPDATE_STATUS_FAIL: {
            return action.payload.error;
        }

    }
}

const getAdminState = createFeatureSelector(
    "admins"
);

export const selectPageState = createSelector(
    getAdminState,
    state => state // return error message
)
