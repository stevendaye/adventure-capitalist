import util from "util";
import config from "config";
import uuid from "uuid/v4";
import DBG from "debug";
import * as UserModel from "../models/users-sequelize";

const debug = DBG("adventure-capitalist-users:controllers-index");
const flush = DBG("adventure-capitalist-users:controllers-error");
debug.useColors = true;
flush.useColors = true;

export default {
    // @access Public
    // @route GET /
    // @desc Main API's route
    index(req, res, next) {
        res.contentType = "json";
        res.send({
            ressource: "/",
            found: true,
            production: true,
            host: "heroku",
            key: uuid(),
            timestamp: (new Date()).getTime()
        });
        next(false);
    },

    // @access Public
    // @route POST /users/register
    async register(req, res, next) {
        try {
            let user = await UserModel.create(
                req.params.id, req.params.name, req.params.email, req.params.password,
                req.params.avatar, req.params.capital, req.params.started_business,
                req.params.last_seen, req.params.created
            );
            debug(`register user: ${util.inspect(user)}`);
            res.send(user);
            next(false);
        } catch (err) {
            res.send(500, err);
            flush(`${config.get("routes.user.register")}: ${err.stack}`);
            next(false);
        }
    },

    // @access Public
    // @route GET /users/find/:email
    async find(req, res, next) {
        try {
            const user = await UserModel.find(req.params.email);
            if (user.found) {  
                debug(`find user by email: ${util.inspect(user)}`);
                res.contentType = "json";
                res.send(user);
                next(false);
            } else {
                debug(`find user by enail: No user of email ${req.params.email}`);
                res.contentType = "json";
                res.send(user);
                next(false);
            }
        } catch (err) {
            res.send(500, err);
            flush(`${config.get("routes.user.find")}: ${err.stack}`);
            next(false);
        }
    },

    // @access Private
    // @route GET /userss/findById/:id
    async findById(req, res, next) {
        try {
            const user = await UserModel.findById(req.params.id);
            if (user.found) {
                debug(`find user by ID: ${util.inspect(user)}`);
                res.contentType = "json";
                res.send(user);
                next(false);
            } else {
                debug(`find user by ID: No user of id ${req.params.id}`);
                res.send(404, new Error(`Cannot find user of id ${req.params.id}`))
                next(false);
            }
        } catch (err) {
            res.send(500, err);
            flush(`${config.get("routes.user.findById")}: ${err.stack}`);
            next(false);
        }
    },

    // @access Public
    // @route POST /users/checkPassword
    async checkPassword(req, res, next) {
        try {
            const verified = await UserModel.checkPassword(req.params.email, req.params.password);
            debug(`check user password: ${util.inspect(verified)}`);
            res.contentType = "json";
            res.send(verified);
            next(false);
        } catch (err) {
            res.send(500, err);
            flush(`${config.get("routes.user.checkPassword")}: ${err.stack}`);
            next(false);
        }
    },

    // @access Private
    // @route PUT /users/update-status
    // @desc Update the started_business boolean attribute
    async updateStatus(req, res, next) {
        try {
            const user = await UserModel.upadateStatus(req.params.id, req.params.status);
            debug(`update user's status: ${{started_business: user.started_business}}`);
            res.send(user);
            next(false);
        } catch (err) {
            res.send(500, err);
            flush(`${config.get("routes.user.updateStatus")}: ${err.stack}`);
            next(false);
        }
    },

    // @access Private
    // @route PUT /users/save/capital
    async saveCapital(req, res, next) {
        try {
            const user =  await UserModel.saveCapital(req.params.id, req.params.capital);
            debug(`save capital: ${{capital: user.capital}} of user ${req.params.id}`);
            res.send(user);
            next(false);
        } catch (err) {
            res.send(500, err);
            flush(`${config.get("routes.user.saveCapital")}: ${err.stack}`);
            next(false);
        }
    },

    // @access Private
    // @route POST /users/save/last-seen
    // @des Save user's lastseen for offline capital calculation
    async saveLastSeen(req, res, next) {
        try {
            const user = await UserModel.saveLastSeen(req.params.id, req.params.last_date);
            debug(`save last date ${req.params.last_date} of user ${req.params.id}`);
            res.send(user);
            next(false);
        } catch (err) {
            res.send(500, err);
            flush(`${config.get("routes.user.saveLastSeen")}: ${err.stack}`);
            next(false);
        }
    },

    // @access Private
    // @route GET /users/get/away-time
    // @des Get the time the user has been away for upon game resuming
    async getAwayTime(req, res, next) {
        try {
            const time = await UserModel.getAwayTime(req.params.id, req.params.log_date);
            debug(`get away time: ${time} of user ${req.params.id}`);
            res.send(time);
            next(false);
        } catch (err) {
            res.send(500, err);
            flush(`${config.get("routes.user.getAwayTime")}: ${err.stack}`);
            next(false);
        }
    },

    // @access Private
    // @route DELETE /users/destroy/:email
    async destroy(req, res, next) {
        try {
            await UserModel.destroy(req.params.email);
            debug(`destroy user of email ${req.params.email}`);
            res.send({});
            next(false);
        } catch (err) {
            res.send(500, err);
            flush(`${config.get("routes.user.destroy")}: ${err.stack}`);
            next(false);
        }
    },

    // @access Private
    // @route GET /users/get/list
    async getList(req, res, next) {
        try {
            let users = await UserModel.getList();
            if (!users) {
                return users = [];
            }
            debug(`get list of users: ${util.inspect(users)}`);
            res.contentType = "json";
            res.send(users);
            next(false);
        } catch (err) {
            res.send(500, err);
            flush(`${config.get("routes.user.list")}: ${err.stack}`);
            next(false);
        }
    }
};
