import registerUser, { getUser, saveUserCapital } from "../apis/register";
import doSetRemoveNotifcations from "./notifications";
import setAuthTokenHeader from "../utils/setAuthTokenHeader";
import { doSaveUserCapital, doCapitalFail } from "../actions/auth";
import { doRegisterSuccess, doRegisterFail, doLoadUser, doSetAuthError } from "../actions/auth";

// @desc Register User in the backend and set token in local storage
const doRegisterThunk = (name, email, password) => {
    return async function (dispatch) {
        try {
            const res = await registerUser(name, email, password);
            dispatch(doRegisterSuccess(res.data));
            dispatch(doLoadUserThunk());
        } catch (err) {
            const errors = err.response.data.errors
            if (errors) {
                errors.forEach(error =>
                    dispatch(doSetRemoveNotifcations(error.message || error.msg, "danger"))
                );
            }
            dispatch(doRegisterFail());
        }
    };
};

// @desc Load the user info from the backend server and store in local storage
const doLoadUserThunk = () => {
    localStorage.token && setAuthTokenHeader(localStorage.token);

    return async function(dispatch) {
        try {
            const res = await getUser();
            dispatch(doLoadUser(res.data));
        } catch (err) {
            dispatch(doSetAuthError()); 
        }
    };
};

// @desc Save capital upon registered user's page refresh/unmounting/closed tab
const doSaveUserCapitalThunk = capital => {
    return async function (dispatch) {
        try {
            const res = await saveUserCapital(capital);
            dispatch(doSaveUserCapital(res.data));
        } catch (err) {
            dispatch(doCapitalFail());
        }
    };
};

export default doRegisterThunk;
export { doLoadUserThunk, doSaveUserCapitalThunk };
