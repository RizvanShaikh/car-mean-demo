import * as TemplateActions from "./template.actions";

import { createFeatureSelector, createSelector } from "@ngrx/store";

export const initialState = [];

export function TemplateReducer(
    state = initialState,
    action: TemplateActions.action
) {
    switch (action.type) {
        // for template load-----------------------------
        case TemplateActions.TemplateActionTypes.LOAD_TEMPLATE_SUCCESS: {
            return action.payload;
        }
        case TemplateActions.TemplateActionTypes.LOAD_TEMPLATE_FAIL: {
            return action.payload.error;
        }
        // for template delete-----------------------------
        case TemplateActions.TemplateActionTypes.DELETE_TEMPLATE_SUCCESS: {
            return action.payload;
        }
        case TemplateActions.TemplateActionTypes.DELETE_TEMPLATE_FAIL: {
            return action.payload.error
        }

        // for template update-----------------------------
        case TemplateActions.TemplateActionTypes.UPDATE_TEMPLATE_SUCCESS: {
            return action.payload
        }
        case TemplateActions.TemplateActionTypes.UPDATE_TEMPLATE_FAIL: {
            return action.payload.error;
        }

        // for template upadat status-----------------------------
        case TemplateActions.TemplateActionTypes.UPDATE_STATUS_SUCCESS: {
            return action.payload
        }
        case TemplateActions.TemplateActionTypes.UPDATE_STATUS_FAIL: {
            return action.payload.error;
        }

        // for template add-----------------------------
        case TemplateActions.TemplateActionTypes.ADD_TEMPLATE_SUCCESS: {
            return action.payload
        }
        case TemplateActions.TemplateActionTypes.ADD_TEMPLATE_FAIL: {
            return action.payload.error;
        }

    }

}

const getTemplateState = createFeatureSelector(
    "template"
);

export const selectPageState = createSelector(
    getTemplateState,
    state => state // return error message
)


