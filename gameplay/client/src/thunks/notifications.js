import uuid from "uuid/v4";
import { doSetNotification, doRemoveNotification } from "../actions/notifications";

const id = uuid();
const timeout = 5000;

const doSetNotificationsThunk = (message, alert) => {
    return function(dispatch) {
        dispatch(doSetNotification(id, message, alert));
        setTimeout(() => {
            dispatch(doRemoveNotification(id));
        }, timeout);
    };
};

export default doSetNotificationsThunk;
