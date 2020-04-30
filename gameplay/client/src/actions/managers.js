import {
    CREATE_MANAGERS, HIRE_MANAGER, LIST_MANAGERS, MANAGER_FAIL,
    CLEAR_MANAGERS
} from "../constants/types";

const doCreateManagers = payload => ({
    type: CREATE_MANAGERS,
    payload
});

const doHireManager = id => ({
    type: HIRE_MANAGER,
    payload: id
});

const doListManagers = payload => ({
    type: LIST_MANAGERS,
    payload
});

const doClearManagers = () => ({
    type: CLEAR_MANAGERS
});

const doSetManagerError = () => ({
    type: MANAGER_FAIL
});

export default doCreateManagers;
export {
    doHireManager, doListManagers, doClearManagers, doSetManagerError
};
