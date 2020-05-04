import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import config from "config";
import bcrypt from "bcryptjs";
import util from "util";
import DBG from "debug";
import * as UserModel from "../models/users-superagent";

const debug = DBG("adventure-capitalist-gameplay:account-controller");
const flush = DBG("adventure-capitalist-gameplay:account-error");
debug.useColors = flush.useColors = true;

export default {
    // @access Public
    // @route POST /users/register
    async register(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { name, email, password } = req.body;
            const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
            const capital = 0;
            const started_business = false;

            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(password, salt);

            let user = await UserModel.find(email);
            if (user.found) {
                debug(`User exists -- ${util.inspect(user)}`);
                return res.status(400).json({ errors: [{ message: user.message }]});
            }

            user = await UserModel.create(name, email, encryptedPassword, avatar,
                capital, started_business);

            const payload = { user: { id: user._id }};
            jwt.sign(payload, config.get("auth.jwtToken"), {expiresIn: 3600}, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.user.register")} -- \n
                Server Error. User Registration Failed`
            );
        }
    },

    // @access Public
    // @route POST /users/login
    async login(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            const { email, password } = req.body;
            const user = await UserModel.checkPassword(email, password);
            if (user.verified) {
                const payload = { user: { id: user.id} };
                jwt.sign(payload, config.get("auth.jwtToken"), { expiresIn: 3600 }, (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                });
            } else {
                return res.status(400).json({ errors: [{ message: user.message }] })
            }
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.user.login")} -- \n
                Server Error. User Login Failed`
            );
        }
    },

    // @access Private
    // @route PUT /users/save/capital
    async saveCapital(req, res, next) {
        try {
            const user = await UserModel.saveCapital(req.user.id, req.body.capital);
            debug(`save user's capital: ${util.inspect(user)}`);
            res.json(user);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.user.saveCapital")} -- \n
                Server Error. Save user's capital failed!`
            );
        }
    },

    // @access Private
    // @route PUT /users/save/last-seen
    async saveLastSeen(req, res, next) {
        try {
            const user = await UserModel.saveLastSeen(req.user.id, req.body.last_date);
            debug(`save user's lastSeen: ${util.inspect(user)}`);
            res.json(user.last_seen);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.user.saveLastSeen")} --\n
                Server Error. Save user's lastSeen failed!`
            );
        }
    }
};