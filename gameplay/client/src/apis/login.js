import axios from "axios"

const LOGIN_URL = "/users/login";

const loginUser = async (email, password) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ email, password });

  return await axios.post(LOGIN_URL, body, config);
};

export default loginUser;
