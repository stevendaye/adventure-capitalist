import { SAVE_LASTSEEN, GET_OFFLINE_REPORT,
    OFFLINE_REPORT_FAIL
} from "../constants/types";

const doSaveLastSeen = payload => ({
    type: SAVE_LASTSEEN,
    payload
});

const doGetOfflineReport = payload => ({
    type: GET_OFFLINE_REPORT,
    payload
});

const doFailOfflineReport = payload => ({
    type: OFFLINE_REPORT_FAIL,
    payload
});

export {
    doSaveLastSeen, doGetOfflineReport,
    doFailOfflineReport
};
