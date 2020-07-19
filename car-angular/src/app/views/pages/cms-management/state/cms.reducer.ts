import * as CMSActions from "./cms.actions";

import { createFeatureSelector, createSelector } from "@ngrx/store";

export const initialState = [];

export function cmsReducer(
    state = initialState,
    action: CMSActions.action
) {
    switch (action.type) {
        // for Grade load-----------------------------
        case CMSActions.CMSActionTypes.LOAD_CMS_SUCCESS: {
            return action.payload;
        }
        case CMSActions.CMSActionTypes.LOAD_CMS_FAIL: {
            return action.payload.error;
        }
        // for CMS delete-----------------------------
        case CMSActions.CMSActionTypes.DELETE_CMS_SUCCESS: {
            return action.payload;
        }
        case CMSActions.CMSActionTypes.DELETE_CMS_FAIL: {
            return action.payload.error
        }

        // for CMS update-----------------------------
        case CMSActions.CMSActionTypes.UPDATE_CMS_SUCCESS: {
            return action.payload
        }
        case CMSActions.CMSActionTypes.UPDATE_CMS_FAIL: {
            return action.payload.error;
        }

        // for CMS upadat  status-----------------------------
        case CMSActions.CMSActionTypes.UPDATE_STATUS_SUCCESS: {
            return action.payload
        }
        case CMSActions.CMSActionTypes.UPDATE_STATUS_FAIL: {
            return action.payload.error;
        }

        // for CMS add-----------------------------
        case CMSActions.CMSActionTypes.ADD_CMS_SUCCESS: {
            return action.payload
        }
        case CMSActions.CMSActionTypes.ADD_CMS_FAIL: {
            return action.payload.error;
        }

    }

}

const getCMSState = createFeatureSelector(
    "cms"
);

export const selectPageState = createSelector(
    getCMSState,
    state => state // return error message
)


