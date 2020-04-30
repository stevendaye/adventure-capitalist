import {
    CREATE_UPGRADES, MAKE_UPGRADE, LIST_UPGRADES, UPGRADE_FAIL,
    CLEAR_UPGRADES
} from "../constants/types";

const doCreateUpagrades = payload => ({
    type: CREATE_UPGRADES,
    payload
});

const doMakeUpgrade = id => ({
    type: MAKE_UPGRADE,
    payload: id
});

const doListUpgrades = payload => ({
    type: LIST_UPGRADES,
    payload
});

const doClearUpgrades = () => ({
    type: CLEAR_UPGRADES
});

const doSetUpgradeError =  () => ({
    type: UPGRADE_FAIL
});

export default doCreateUpagrades;
export {
    doMakeUpgrade, doListUpgrades, doClearUpgrades, doSetUpgradeError
};
