/* @desc Managers Reducers, handles managers' state */

import {
    CREATE_MANAGERS, HIRE_MANAGER, LIST_MANAGERS, MANAGER_FAIL,
    CLEAR_MANAGERS
} from "../constants/types"

const initialState = {
    managers: [],
    isLoading: true,
    error: {}
};

// @desc Apply each action accordingly to the manager's request
const applyCreateManagers = (state, payload) => ({
    ...state,
    managers: payload,
    isLoading: false
});

const applyHireManager = (state, payload) => ({
    ...state,
    managers: state.managers.filter(manager => manager.id !== payload),
    isLoading: false
});

const applyListManagers = (state, payload) => ({
    ...state,
    managers: payload,
    isLoading: false
});

const applyManagerFail = (state, payload) => ({
    ...state,
    managers: [],
    isLoading: false,
    error: payload ? payload : {}
});

const managersReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_MANAGERS:
            return applyCreateManagers(state, payload);
        case HIRE_MANAGER:
            return applyHireManager(state, payload);
        case LIST_MANAGERS:
            return applyListManagers(state, payload);
        case CLEAR_MANAGERS:
        case MANAGER_FAIL:
            return applyManagerFail(state, payload);
        default:
            return state;
    }
};

export default managersReducer;
