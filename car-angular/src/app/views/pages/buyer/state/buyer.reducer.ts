import * as BuyerActions from "./buyer.actions";

import { createFeatureSelector, createSelector } from "@ngrx/store";

export const initialState = [];

export function BuyerReducer(
    state = initialState,
    action: BuyerActions.action
) {
    switch (action.type) {
        // for Buyer load-----------------------------
        case BuyerActions.BuyerActionTypes.LOAD_BUYER_SUCCESS: {
            return action.payload;
        }
        case BuyerActions.BuyerActionTypes.LOAD_BUYER_FAIL: {
            return action.payload.error;
        }
        // for Buyer delete-----------------------------
        case BuyerActions.BuyerActionTypes.DELETE_BUYER_SUCCESS: {
            return action.payload;
        }
        case BuyerActions.BuyerActionTypes.DELETE_BUYER_FAIL: {
            return action.payload.error
        }

        // for Buyer update-----------------------------
        case BuyerActions.BuyerActionTypes.UPDATE_BUYER_SUCCESS: {
            return action.payload
        }
        case BuyerActions.BuyerActionTypes.UPDATE_BUYER_FAIL: {
            return action.payload.error;
        }

        // for Buyer upadat status-----------------------------
        case BuyerActions.BuyerActionTypes.UPDATE_STATUS_SUCCESS: {
            return action.payload
        }
        case BuyerActions.BuyerActionTypes.UPDATE_STATUS_FAIL: {
            return action.payload.error;
        }

        // for Buyer add-----------------------------
        case BuyerActions.BuyerActionTypes.ADD_BUYER_SUCCESS: {
            return action.payload
        }
        case BuyerActions.BuyerActionTypes.ADD_BUYER_FAIL: {
            return action.payload.error;
        }


    }

}

const getBuyerState = createFeatureSelector(
    "buyer"
);

export const selectPageState = createSelector(
    getBuyerState,
    state => state // return error message
)


