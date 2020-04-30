import DBG from "debug";
import config from "config";
import * as UserModel from "../models/users-superagent";

const debug = DBG("adventure-capitalist-gameplay:auth-controller");
const flush = DBG("adventure-capitalist-gameplay:auth-error");
debug.useColors = flush.useColors = true;

export default {
    // @access Private
    // @route Get /auth
    // @desc Send logged in user credentials
    async index(req, res, next) {
        try {
            const user = await UserModel.findById(req.user.id);
            res.json(user.sanitize);
            debug(`find user: ${user}`);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.auth")} -- \n
                Server Error. Getting Auth user by id ${req.user.id} failed`
            );
        }
    }
};