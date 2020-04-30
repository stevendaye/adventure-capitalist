import { combineReducers } from "redux";
import notificationsReducer from "./notifications";
import authReducer from "./auth";
import businessesReducer from "./businesses";
import managersReducer from "./managers";
import upgradesReducer from "./upgrades";
import reportReducer from "./report";

const rootReducer = combineReducers({
    authState: authReducer,
    notificationsState: notificationsReducer,
    businessesState: businessesReducer,
    managersState: managersReducer,
    upgradesState: upgradesReducer,
    reportState: reportReducer
});

export default rootReducer;
