import doCreateBusiness, {
    doBuyBusiness, doPutManager, doApplyBusinessUpgrade, doUpdateAcquiredBusiness,
    doListBusinesses, doSetBusinessError,
} from "../actions/businesses";
import {
    createBusinesses, buyBusiness, putManager, updateAcquire,
    applyUpgrade, listBusinesses
} from "../apis/businesses";
import { doLoadUserThunk } from "./register";

const doCreateBusinessThunk = businessees => {
    return async function(dispatch) {
        try {
            const res = await createBusinesses(businessees)
            dispatch(doCreateBusiness(res.data));
            dispatch(doLoadUserThunk());
        } catch (err) {
            dispatch(doSetBusinessError({
                message: err.response.statusText,
                status: err.response.status
            }));
        }
    };
};

const doBuyBusinessThunk = (id, multiplier) => {
    return async function (dispatch) {
        try {
            const res = await buyBusiness(id, multiplier);
            dispatch(doBuyBusiness(res.data));
            dispatch(doListBusinessesThunk());
        } catch (err) {
            dispatch(doSetBusinessError({
                message: err.response.statusText,
                status: err.response.status
            }));
        }
    };
};

const doPutManagerThunk = (business_type, status) => {
    return async function (dispatch) {
        try {
            const res = await putManager(business_type, status);
            dispatch(doPutManager(res.data));
            dispatch(doListBusinessesThunk());
        } catch (err) {
            dispatch(doSetBusinessError({
                message: err.response.statusText,
                status: err.response.status
            }));
        }
    };
};

const doApplyBusinessUpgradeThunk = business_type => {
    return async function (dispatch) {
        try {
            const res = await applyUpgrade(business_type);
            dispatch(doApplyBusinessUpgrade(res.data));
            dispatch(doListBusinessesThunk());
        } catch (err) {
            dispatch(doSetBusinessError({
                message: err.response.statusText,
                status: err.response.status
            }));
        }
    };
};

const doUpdateAcquiredBusinessThunk = status => {
    return async function (dispatch) {
        try {
            const res = await updateAcquire(status);
            dispatch(doUpdateAcquiredBusiness(res.data));
            dispatch(doListBusinessesThunk());
        } catch (err) {
            dispatch(doSetBusinessError({
                message: err.response.statusText,
                status: err.response.status
            }));
        }
    };
};

const doListBusinessesThunk = () => {
    return async function (dispatch) {
        try {
            const res = await listBusinesses();
            dispatch(doListBusinesses(res.data));
        } catch (err) {
            dispatch(doSetBusinessError({
                message: err.response.statusText,
                status: err.response.status
            }));
        }
    };
};

export default doCreateBusinessThunk;
export {
    doBuyBusinessThunk, doPutManagerThunk,
    doApplyBusinessUpgradeThunk, doUpdateAcquiredBusinessThunk,
    doListBusinessesThunk,
};
