// @desc Get the token from the local storage and set it in the Header
import axios from "axios";

const setAuthTokenHeader = token => {
    token
    ? (axios.defaults.headers.common["x-auth-token"] = token)
    : delete axios.defaults.headers.common["x-auth-token"]
};

export default setAuthTokenHeader;
