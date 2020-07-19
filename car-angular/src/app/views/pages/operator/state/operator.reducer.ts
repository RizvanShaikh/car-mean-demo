import * as OperatorActions from "./operator.actions";

import { createFeatureSelector, createSelector } from "@ngrx/store";

export const initialState = [];

export function OperatorReducer(
    state = initialState,
    action: OperatorActions.action
) {
    switch (action.type) {
        // for Operator load-----------------------------
        case OperatorActions.OperatorActionTypes.LOAD_OPERATOR_SUCCESS: {
            return action.payload;
        }
        case OperatorActions.OperatorActionTypes.LOAD_OPERATOR_FAIL: {
            return action.payload.error;
        }
        // for Operator delete-----------------------------
        case OperatorActions.OperatorActionTypes.DELETE_OPERATOR_SUCCESS: {
            return action.payload;
        }
        case OperatorActions.OperatorActionTypes.DELETE_OPERATOR_FAIL: {
            return action.payload.error
        }

        // for Operator update-----------------------------
        case OperatorActions.OperatorActionTypes.UPDATE_OPERATOR_SUCCESS: {
            return action.payload
        }
        case OperatorActions.OperatorActionTypes.UPDATE_OPERATOR_FAIL: {
            return action.payload.error;
        }

        // for Operator upadat status-----------------------------
        case OperatorActions.OperatorActionTypes.UPDATE_STATUS_SUCCESS: {
            return action.payload
        }
        case OperatorActions.OperatorActionTypes.UPDATE_STATUS_FAIL: {
            return action.payload.error;
        }

        // for Operator add-----------------------------
        case OperatorActions.OperatorActionTypes.ADD_OPERATOR_SUCCESS: {
            return action.payload
        }
        case OperatorActions.OperatorActionTypes.ADD_OPERATOR_FAIL: {
            return action.payload.error;
        }

    }

}

const getOperatorState = createFeatureSelector(
    "operator"
);

export const selectPageState = createSelector(
    getOperatorState,
    state => state // return error message
)


