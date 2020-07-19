import * as ProviderActions from "./provider.actions";

import { createFeatureSelector, createSelector } from "@ngrx/store";

export const initialState = [];

export function ProviderReducer(
    state = initialState,
    action: ProviderActions.action
) {
    switch (action.type) {
        // for Provider load-----------------------------
        case ProviderActions.ProviderActionTypes.LOAD_PROVIDER_SUCCESS: {
            return action.payload;
        }
        case ProviderActions.ProviderActionTypes.LOAD_PROVIDER_FAIL: {
            return action.payload.error;
        }
        // for Provider delete-----------------------------
        case ProviderActions.ProviderActionTypes.DELETE_PROVIDER_SUCCESS: {
            return action.payload;
        }
        case ProviderActions.ProviderActionTypes.DELETE_PROVIDER_FAIL: {
            return action.payload.error
        }

        // for Provider update-----------------------------
        case ProviderActions.ProviderActionTypes.UPDATE_PROVIDER_SUCCESS: {
            return action.payload
        }
        case ProviderActions.ProviderActionTypes.UPDATE_PROVIDER_FAIL: {
            return action.payload.error;
        }

        // for Provider upadat status-----------------------------
        case ProviderActions.ProviderActionTypes.UPDATE_STATUS_SUCCESS: {
            return action.payload
        }
        case ProviderActions.ProviderActionTypes.UPDATE_STATUS_FAIL: {
            return action.payload.error;
        }

        // for Provider add-----------------------------
        case ProviderActions.ProviderActionTypes.ADD_PROVIDER_SUCCESS: {
            return action.payload
        }
        case ProviderActions.ProviderActionTypes.ADD_PROVIDER_FAIL: {
            return action.payload.error;
        }


    }

}

const getProviderState = createFeatureSelector(
    "provider"
);

export const selectPageState = createSelector(
    getProviderState,
    state => state // return error message
)


