import axios from "axios";

const CREATE_URL = "/managers/create";
const HIRE_URL = "/managers/hire";
const LIST_URL = "/managers/get/list";

const createManagers = async managers => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ managers });

    return await axios.post(CREATE_URL, body, config);
};

const hireManager = async manager_id => {
    return await axios.delete(`${HIRE_URL}/${manager_id}`);
};

const listManagers = async () => {
    return await axios.get(LIST_URL);
};

export {
    createManagers, hireManager, listManagers,
};
