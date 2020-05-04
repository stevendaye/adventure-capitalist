"use strict"

import restify from "restify-clients";
import bcrypt from "bcrypt";
import gravatar from "gravatar";
import config from "config";
import util from "util";
import DBG from "debug";

const debug = DBG("adventure-capitalist-users:create-user");
const flush = DBG("adventure-capitalist-users:create-error");
debug.useColors = true;
flush.useColors = true;

// @desc Create Client Object;
const client = restify.createJSONClient({
    url: `http://127.0.0.1:${process.env.PORT}`,
    version: "*"
});

// Set up the HTTP basic Auth for req.authorization.basic
client.basicAuth("gc_adcap", "JLOAO217-ACKL-R26A-2SEA-8W2LE76IODS7");

const avatar = gravatar.url("dev.stevendaye@yahoo.com", { s: 200, r: "pg", d: "mm" });
const password = "01stevendaye01";
let capital = 798971456789283.61875;
let started_business = false;

async function encrypt() {
    try {
        const salt = await bcrypt.genSalt(10);
        const encrypted = await bcrypt.hash(password, salt);
        return encrypted;
    } catch (err) {
        flush(`Password Encryption failed -- ${err.stack}`);
    }
}

(async () => {
    client.post(config.get("routes.user.register"), {
        name: "Steven Daye", email: "dev.stevendaye@yahoo.com",
        password: await encrypt(), avatar, capital, started_business
    }, (err, req, res, obj) => {
        err
        ? flush(`create user: User registration failed -- \n Error: ${util.inspect(err)}`)
        : debug(`create user successful -- ${util.inspect(obj)}`);
    });
})().catch(err => flush(err));
