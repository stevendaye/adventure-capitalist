import DBG from "debug";
import util from "util";
import config from "config";
import * as ManagerModel from "../models/managers-sequelize";

const debug = DBG("adventure-capitalist-gameplay:manager-controllers");
const flush = DBG("adventure-capitalist-gameplay:manager-error");
debug.useColors = flush.useColors = true;

export default {
    // @access Private
    // @route POST /managers/create
    async create(req, res, next) {
        try {
            let createdManagers;
            const managers = req.body.managers;
            const userManagers = [];
            managers.map(manager => {
                userManagers.push({
                    name: manager.name,
                    title: manager.title,
                    business_type: manager.business_type,
                    role: manager.role,
                    cost: manager.cost,
                    userid: req.user.id,
                    order: manager.order
                });
            });
            createdManagers = userManagers.map( async manager =>
                await ManagerModel.create(manager.name, manager.title,
                    manager.business_type, manager.role, manager.cost,
                    manager.userid, manager.order
                )
            );
            debug(`create managers: ${util.inspect(userManagers)}`);
            res.json(await Promise.all(createdManagers));
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.manager.create")} -- \n
                Server Error. Creation of managers failed!`
            );
        }
    },

    // @access Private
    // @route DELET /managers/hire:id
    async hire(req, res ,next) {
        try {
            await ManagerModel.hire(req.user.id, req.params.id);
            debug(`hired manager of id ${req.params.id}`);
            res.json({});
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.manager.hire")} -- \n
                Server Error. Hiring managers failed!`
            );
        }
    },

    // @access Private
    // @route GET /managers/list
    async getList(req, res, next) {
        try {
            let managers = await ManagerModel.getList(req.user.id);
            if (!managers) {
                managers = [];
            }
            debug(`get list of managers: ${util.inspect(managers)}`);
            res.json(managers);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.manager.getList")} -- \n
                Server Error. Listing managers failed!`
            );
        }
    }
};
