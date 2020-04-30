import doCreateManagers, {
    doHireManager, doListManagers, doSetManagerError
} from "../actions/managers";
import { createManagers, hireManager, listManagers } from "../apis/managers";
import { doPutManagerThunk } from "./businesses";

const doCreateManagersThunk = managers => {
    return async function (dispatch) {
        try {
            const res = await createManagers(managers);
            dispatch(doCreateManagers(res.data));
        } catch (err) {
            dispatch(doSetManagerError({
                message: err.response.statusText,
                status: err.response.status
            }));
        }
    };
};

const doHireManagerThunk = (manager_id, business_type) => {
    return async function (dispatch) {
        try {
            await hireManager(manager_id);
            dispatch(doHireManager(manager_id));
            dispatch(doPutManagerThunk(business_type, true));
            
        } catch (err) {
            dispatch(doSetManagerError({
                message: err.response.statusText,
                status: err.response.status
            }));
        }
    }
};

const doListManagersThunk = () => {
    return async function (dispatch) {
        try {
            const res = await listManagers();
            dispatch(doListManagers(res.data));
        } catch (err) {
            dispatch(doSetManagerError({
                message: err.response.statusText,
                status: err.response.status
            }));
        }
    };
};

export default doCreateManagersThunk;
export { doHireManagerThunk, doListManagersThunk };
