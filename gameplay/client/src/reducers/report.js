/* @desc Report Reducer, handles the report state */

import {
    SAVE_LASTSEEN, GET_OFFLINE_REPORT, OFFLINE_REPORT_FAIL
} from "../constants/types";

const initialState = {
    offline: {},
    isLoading: true,
    error: {}
};

const applySaveLastSeen = (state, payload) => ({
    ...state,
    offline: { ...state.offline, lastSeen: payload },
    isLoading: false,
});

const applyGetOffline = (state, payload) => ({
    ...state,
    offline: payload,
    isLoading: false
});

const applyOfflineFail = (state, payload) => ({
    ...state,
    offline: {},
    isLoading: false,
    error: payload ? payload : {}
});

const reportReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SAVE_LASTSEEN:
            return applySaveLastSeen(state, payload);
        case GET_OFFLINE_REPORT:
            return applyGetOffline(state, payload);
        case OFFLINE_REPORT_FAIL:
            return applyOfflineFail(state, payload);
        default:
            return state;
    }
};

export default reportReducer;
