/* @desc Businesses Reducer, hamdles everything about a business state */

import {
    CREATE_BUSINESSES, BUY_BUSINNESS, PUT_MANAGER, UPDATE_ACQUIRED_BUSINESS,
    APPLY_UPGRADE, LIST_BUSINESSES, CLEAR_BUSINESSES, BUSINESS_FAIL
}  from "../constants/types";

const initialState = {
    businesses: [],
    business: null,
    isLoading: true,
    error: {}
};

const applyCreateBusinesses = (state, payload) => ({
    ...state,
    businesses: payload,
    isLoading: false,
});

const applyBuyBusiness = (state, payload) => ({
    ...state,
    business: payload,
    isLoading: false
});

const applyPutManager = (state, payload) => ({
    ...state,
    business: payload,
    isLoading: false
});

const applyUpdateAcquired = (state, payload) => ({
    ...state,
    business: payload,
    isLoading: false
});

const applyUpgradeBusiness = (state, payload) => ({
    ...state,
    business: payload,
    isLoading: false
});

const applyListBusinesses = (state, payload) => ({
    ...state,
    businesses: payload,
    isLoading: false
});

const applyBusinessFail = (state, payload) => ({
    ...state,
    businesses: [],
    business: null,
    isLoading: false,
    error: payload ? payload : {}
});

const businessesReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_BUSINESSES:
            return applyCreateBusinesses(state, payload);
        case BUY_BUSINNESS:
            return applyBuyBusiness(state, payload);
        case PUT_MANAGER:
            return applyPutManager(state, payload);
        case UPDATE_ACQUIRED_BUSINESS:
            return applyUpdateAcquired(state, payload);
        case APPLY_UPGRADE:
            return applyUpgradeBusiness(state, payload);
        case LIST_BUSINESSES:
            return applyListBusinesses(state, payload);
        case CLEAR_BUSINESSES:
        case BUSINESS_FAIL:
            return applyBusinessFail(state, payload);
        default:
            return state;
    }
};

export default businessesReducer;
