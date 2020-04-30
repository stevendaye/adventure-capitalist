import {
    CREATE_BUSINESSES, BUY_BUSINNESS, UPDATE_ACQUIRED_BUSINESS,
    PUT_MANAGER,  APPLY_UPGRADE, LIST_BUSINESSES, BUSINESS_FAIL,
    CLEAR_BUSINESSES
} from "../constants/types";

const doCreateBusinesses = payload => ({
    type: CREATE_BUSINESSES,
    payload
});

const doBuyBusiness = payload => ({
    type: BUY_BUSINNESS,
    payload
});

const doUpdateAcquiredBusiness = payload => ({
    type: UPDATE_ACQUIRED_BUSINESS,
    payload
});

const doPutManager = payload => ({
    type: PUT_MANAGER,
    payload
});

const doApplyBusinessUpgrade = payload => ({
    type: APPLY_UPGRADE,
    payload
});

const doListBusinesses = payload => ({
    type: LIST_BUSINESSES,
    payload
});

const doClearBusinesses = () => ({
    type: CLEAR_BUSINESSES
});

const doSetBusinessError = () => ({
    type: BUSINESS_FAIL
});

export default doCreateBusinesses;
export {
    doBuyBusiness, doUpdateAcquiredBusiness, doPutManager, doApplyBusinessUpgrade,
    doListBusinesses, doClearBusinesses, doSetBusinessError
};
