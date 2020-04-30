import doCreateUpgrades, {
    doMakeUpgrade, doListUpgrades, doSetUpgradeError
} from "../actions/upgrades";
import { createUpgrades, makeUpgrade, listUpgrades } from "../apis/upgrades";
import { doApplyBusinessUpgradeThunk } from "./businesses";

const doCreateUpgradesThunk = upgrades => {
    return async function (dispatch) {
        try {
            const res = await createUpgrades(upgrades);
            dispatch(doCreateUpgrades(res.data));
        } catch (err) {
            dispatch(doSetUpgradeError({
                message: err.response.statusText,
                status: err.response.status
            }));
        }
    };
};

const doMakeUpgradeThunk = (upgrade_id, business_type) => {
    return async function (dispatch) {
        try {
            await makeUpgrade(upgrade_id);
            dispatch(doMakeUpgrade(upgrade_id));
            dispatch(doApplyBusinessUpgradeThunk(business_type));
        } catch (err) {
            dispatch(doSetUpgradeError({
                message: err.response.statusText,
                status: err.response.status
            }));
        }
    };
};

const doListUpgradesThunk = () => {
    return async function (dispatch) {
        try {
            const res = await listUpgrades();
            dispatch(doListUpgrades(res.data));
        } catch (err) {
            dispatch(doSetUpgradeError({
                message: err.response.statusText,
                status: err.response.status
            }));
        }
    };
};

export default doCreateUpgradesThunk;
export {
    doMakeUpgradeThunk, doListUpgradesThunk
};
