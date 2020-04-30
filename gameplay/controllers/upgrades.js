import DBG from "debug";
import util from "util";
import config from "config";
import * as UpgradeModel from "../models/upgrades-sequelize";

const debug = DBG("adventure-capitalist-gameplay:upgrade-controllers");
const flush = DBG("adventure-capitalist-gameplay:upgrade-error");
debug.useColors = flush.useColors = true;

export default {
    // @access Private
    // @route POST /upgrades/create
    async create(req, res, next) {
        try {
            let createdUpgrades;
            const upgrades = req.body.upgrades;
            const userUpgrades = [];
            upgrades.map(upgrade => {
                userUpgrades.push({
                    name: upgrade.name,
                    title: upgrade.title,
                    business_type: upgrade.business_type,
                    profit: upgrade.profit,
                    cost: upgrade.cost,
                    userid: req.user.id,
                    order: upgrade.order
                });
            });
            createdUpgrades = userUpgrades.map( async upgrade =>
                await UpgradeModel.create(upgrade.name, upgrade.title,
                    upgrade.business_type, upgrade.profit, upgrade.cost,
                    upgrade.userid, upgrade.order
                )
            );
            debug(`create upgrades: ${util.inspect(userUpgrades)}`);
            res.json(await Promise.all(createdUpgrades));
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.upgrade.create")} -- \n
                Server Error. Creation of upgrades failed!`
            );
        }
    },

    // @access Private
    // @route DELETE /upgrades/:id
    async apply(req, res ,next) {
        try {
            await UpgradeModel.apply(req.user.id, req.params.id);
            debug(`upgraded business`);
            res.json({});
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.upgrade.apply")} -- \n
                Server Error. Upgrading business failed!`
            );
        }
    },

    // @access Private
    // @route GET /upgrades/list
    async getList(req, res, next) {
        try {
            let upgrades = await UpgradeModel.getList(req.user.id);
            if (!upgrades) {
                upgrades = [];
            }
            debug(`get list of upgrades: ${util.inspect(upgrades)}`);
            res.json(upgrades);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.upgrade.getList")} -- \n
                Server Error. Listing upgrades failed!`
            );
        }
    }
};