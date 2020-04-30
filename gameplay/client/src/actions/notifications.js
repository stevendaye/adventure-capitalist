import { SET_NOTIFICATION, REMOVE_NOTIFICATION } from "../constants/types";

const doSetNotification = (id, message, alert) => ({
    type: SET_NOTIFICATION,
    payload: { id, message, alert }
});

const doRemoveNotification = id => ({
    type: REMOVE_NOTIFICATION,
    payload: id
});

export { doSetNotification, doRemoveNotification };
