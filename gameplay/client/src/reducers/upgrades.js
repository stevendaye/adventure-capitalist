/* @desc Upgrades Reducer, handles everything about upgrades state */

import {
    CREATE_UPGRADES, MAKE_UPGRADE, LIST_UPGRADES, UPGRADE_FAIL,
    CLEAR_UPGRADES
} from "../constants/types";

const initialState = {
    upgrades: [],
    isLoading: true,
    error: {}
};

// @desc Apply each action accordingly to the upgrade's request
const applyCreateUpgrades = (state, payload) => ({
    ...state,
    upgrades: payload,
    isLoading: false
});

const applyMakeUpgrade = (state, payload) => ({
    ...state,
    upgrades: state.upgrades.filter(upgrade => upgrade.id !== payload),
    isLoading: false
});

const applyListUpgrades = (state, payload) => ({
    ...state,
    upgrades: payload,
    isLoading: false
});

const applyUpgradeFail = (state, payload) => ({
    ...state,
    upgrades: [],
    isLoading: false,
    error: payload ? payload : {}
});

const upgradesReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case CREATE_UPGRADES:
            return applyCreateUpgrades(state, payload);
        case MAKE_UPGRADE:
            return applyMakeUpgrade(state, payload);
        case LIST_UPGRADES:
            return applyListUpgrades(state, payload);
        case CLEAR_UPGRADES:
        case UPGRADE_FAIL:
            return applyUpgradeFail(state, payload);
        default:
            return state;
    }
};

export default upgradesReducer;
