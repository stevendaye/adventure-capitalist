import { saveLastSeen, getOfflineReport } from "../apis/report";
import { doSaveLastSeen, doGetOfflineReport, doFailOfflineReport } from "../actions/report";

const doSaveLastSeenThunk = last_date => {
    return async function (dispatch) {
        try {
            const res = await saveLastSeen(last_date);
            dispatch(doSaveLastSeen(res.data));
        } catch (err) {
            dispatch(doFailOfflineReport({
                message: err.response.statusText,
                status: err.response.status
            }));
        }
    };
};

const doGetOfflineReportThunk = log_date => {
    return async function(dispatch) {
        try {
            const res = await getOfflineReport(log_date);
            dispatch(doGetOfflineReport(res.data));
        } catch (err) {
            dispatch(doFailOfflineReport({
                message: err.response.statusText,
                status: err.response.status
            }));
        }
    };
};

export {
    doSaveLastSeenThunk, doGetOfflineReportThunk
};
