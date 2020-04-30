import axios from "axios";

const SAVE_URL = "/users/save/last-seen";
const GET_REPORT_URL = "/businesses/get/offline-report";

const saveLastSeen = async last_date => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    };

    const body = JSON.stringify({ last_date });

    return await axios.put(SAVE_URL, body, config);
};

const getOfflineReport = async log_date => {
    return await axios.get(`${GET_REPORT_URL}/${log_date}`);
};

export {
    saveLastSeen, getOfflineReport
};
