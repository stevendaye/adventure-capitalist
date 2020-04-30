import axios from "axios";

const AUTH_URL = "/auth";
const BASE_URL = "/users/register";
const SAVE_URL = "/users/save/capital";

const registerUser = async (name, email, password) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ name, email, password });
    return await axios.post(BASE_URL, body, config);
};

const getUser = async () => {
    return await axios.get(AUTH_URL);
};

const saveUserCapital = async capital => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({capital});
    return await axios.put(SAVE_URL, body, config);
};

export default registerUser;
export { getUser, saveUserCapital };
