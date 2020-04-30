import axios from "axios";

const CREATE_URL = "/upgrades/create";
const UPGRADE_URL = "/upgrades/apply";
const LIST_URL = "/upgrades/get/list";

const createUpgrades = async upgrades => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ upgrades });

    return await axios.post(CREATE_URL, body, config);
};

const makeUpgrade = async upgrade_id => {
    return await axios.delete(`${UPGRADE_URL}/${upgrade_id}`);
};

const listUpgrades = async () => {
    return await axios.get(LIST_URL);
};

export {
    createUpgrades, makeUpgrade, listUpgrades
};
