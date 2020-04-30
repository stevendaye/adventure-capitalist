import axios from "axios";

const CREATE_URL = "/businesses/create";
const BUY_URL = "/businesses/buy";
const UPDATE_ACQUIRE_URL =  "/businesses/acquired";
const PUT_MANAGER_URL = "/businesses/put-manager";
const APPLY_UPGRADE_URL = "/businesses/apply-upgrade";
const LIST_URL = "/businesses/get/list";

const createBusinesses = async businesses => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ businesses });

    return await axios.post(CREATE_URL, body, config);
};

const buyBusiness = async (id, multiplier) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ id, multiplier })

    return await axios.put(BUY_URL, body, config);
};

const updateAcquire = async status => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ status });

    return await axios.put(UPDATE_ACQUIRE_URL, body, config)
};

const putManager = async (business_type, status) => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ business_type, status })

    return await axios.put(PUT_MANAGER_URL, body, config);
};

const applyUpgrade = async business_type => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ business_type })

    return await axios.put(APPLY_UPGRADE_URL, body, config);
};

const listBusinesses = async () => {
    return await axios.get(LIST_URL);
};

export {
    createBusinesses, buyBusiness, updateAcquire, putManager,
    applyUpgrade, listBusinesses
};