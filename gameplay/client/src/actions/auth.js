// @desc Actions to be triggered on user authentication
import {
    REGISTER_SUCCESS, REGISTER_FAIL,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT,
    USER_LOADED, AUTH_TOKEN_ERROR,
    UPDATE_CAPITAL, SAVE_CAPITAL, CAPITAL_FAIL
} from "../constants/types";

// Register Action Creators
const doRegisterSuccess = payload => ({
    type: REGISTER_SUCCESS,
    payload
});

const doRegisterFail = () => ({
    type: REGISTER_FAIL
});

// Login Action Creators
const doLoginSuccess = payload => ({
    type: LOGIN_SUCCESS,
    payload
});

const doLoginFail = () => ({
    type: LOGIN_FAIL
});

// Update and Save user's capital
const doUpdateCapital = payload => ({
    type: UPDATE_CAPITAL,
    payload
});

const doSaveUserCapital = payload => ({
    type: SAVE_CAPITAL,
    payload
});

const doCapitalFail = () => ({
    type: CAPITAL_FAIL
});

// Load User && Logout Action Creators
const doLoadUser = payload => ({
    type: USER_LOADED,
    payload
});

const doSetAuthError = () => ({
    type: AUTH_TOKEN_ERROR
});

const doLogOut = () => ({
    type: LOGOUT
});

export {
    doRegisterSuccess, doRegisterFail,
    doLoginSuccess,doLoginFail,
    doUpdateCapital, doSaveUserCapital, doCapitalFail,
    doLoadUser, doSetAuthError, doLogOut
};
