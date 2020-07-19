import * as ContactUsActions from "./contact-us.actions";

import { createFeatureSelector, createSelector } from "@ngrx/store";

export const initialState = [];

export function contactUsReducer(
    state = initialState,
    action: ContactUsActions.action
) {
    switch (action.type) {
        // for Contact Us load-----------------------------
        case ContactUsActions.ContactUsActionTypes.LOAD_CONTACTUS_SUCCESS: {
            return action.payload;
        }
        case ContactUsActions.ContactUsActionTypes.LOAD_CONTACTUS_FAIL: {
            return action.payload.error;
        }
    }

}

const getContactUsState = createFeatureSelector(
    "contact-us"
);

export const selectPageState = createSelector(
    getContactUsState,
    state => state // return error message
)


