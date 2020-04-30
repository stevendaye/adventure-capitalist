import { doLoginSuccess, doLoginFail } from "../actions/auth";
import doSetNotificationsThunk from "./notifications";
import { doLoadUserThunk } from "./register";
import loginUser from "../apis/login";
import { doListBusinessesThunk } from "./businesses";
import { doListManagersThunk } from "./managers";
import { doListUpgradesThunk } from "./upgrades";

const doLoginThunk = (email, password) => {
  return async function(dispatch) {
    try {
      const res = await loginUser(email, password);
      dispatch(doLoginSuccess(res.data));
      dispatch(doLoadUserThunk());
      dispatch(doListBusinessesThunk());
      dispatch(doListManagersThunk());
      dispatch(doListUpgradesThunk());
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach(error =>
            dispatch(doSetNotificationsThunk(error.message || error.msg, "danger")
        ));
      }
      dispatch(doLoginFail());
    }
  };
};

export default doLoginThunk;
