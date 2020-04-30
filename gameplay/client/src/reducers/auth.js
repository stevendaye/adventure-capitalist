/* @desc User Authentication Reducer, handles user's state */

import {
    REGISTER_SUCCESS, REGISTER_FAIL,
    LOGIN_SUCCESS, LOGIN_FAIL,
    UPDATE_CAPITAL, SAVE_CAPITAL, CAPITAL_FAIL,
    USER_LOADED, AUTH_TOKEN_ERROR, LOGOUT
} from "../constants/types";

const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: true
};

const applyAuthenticateSuccess = (state, payload) => {
    localStorage.setItem("token", payload.token);
    return {
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false
    }
};

const applySaveCapital = (state, payload) => ({
    ...state,
    user: {...state.user, capital: payload.capital},
    isLoading: false
});

const applyUpdateCapital = (state, payload) => ({
    ...state,
    user: {...state.user, capital: payload},
    isLoading: false
});

const applyLoadUser = (state, payload) => ({
    ...state,
    user: payload ,
    isAuthenticated: true,
    isLoading: false
});

const applyAuthenticateFail = state => {
    localStorage.removeItem("token");
    return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: null,
        isLoading: false
    };
};

const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            return applyAuthenticateSuccess(state, payload);
        case UPDATE_CAPITAL:
            return applyUpdateCapital(state, payload);
        case SAVE_CAPITAL:
            return applySaveCapital(state, payload);
        case USER_LOADED:
            return applyLoadUser(state, payload);
        case CAPITAL_FAIL:
        case REGISTER_FAIL:
        case LOGIN_FAIL:
        case AUTH_TOKEN_ERROR:
        case LOGOUT:
            return applyAuthenticateFail(state);
        default:
            return state;
    }
};

export default authReducer;
