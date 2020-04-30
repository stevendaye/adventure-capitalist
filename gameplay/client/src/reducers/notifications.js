/* @desc Notification Reducer, handles notifcations state */

import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from "../constants/types";

const initialState = {};

const applySetNotification = (state, payload) => {
    const { id } = payload;
    return { ...state, [id]: payload };
};

const applyRemoveNotification = (state, payload) => {
    const { [payload]: notificationToRemove, ...restNotifications } = state;
    return restNotifications;
};

const notificationsReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case SET_NOTIFICATION:
            return applySetNotification(state, payload);
        case REMOVE_NOTIFICATION:
            return applyRemoveNotification(state, payload);
        default:
            return state;
    }
};

export default notificationsReducer;
