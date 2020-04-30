import restify from "restify";
import DBG from "debug";
import util from "util";
import usersRoutes from "./routes";

const debug = DBG("adventure-capitalist-users:server-service");
const flush = DBG("adventure-capitalist-users:server-error");
debug.useColor = true;
flush.useColor = true;

// @desc Hardcode API Key authentication to grant access to the user server
const apiKeys = [{
    user: "gc_adcap",
    key: "JLOAO217-ACKL-R26A-2SEA-8W2LE76IODS7"
}];

// @desc Check for authorization credentials in the request header
const check = (req, res, next) => {
    if (req.authorization && req.authorization.basic) {
        let $BASIC_FOUND = false;
        for (let auth of apiKeys) {
            if (req.authorization.basic.password === auth.key
                && req.authorization.basic.username === auth.user) {
                $BASIC_FOUND = true;
                break;
            }
        }
        if ($BASIC_FOUND) {
            next();
            debug("Access to the User Server Granted");
        } else {
            res.send(401, new Error("Service Authentication Failed"));
            flush(`$BASIC_FOUND = ${$BASIC_FOUND} -- Access Denied`);
            next(false);
        }
    } else {
        res.send(500, new Error("Not Authorization credentials found"));
        flush(`Cannot find authorization credentials - ${util.inspect(req.authorization.basic)}`);
        next(false);
    }
};

// @desc Create Restify Server
const server = restify.createServer({
    name: "User-Auth-Service",
    version: "1.0.0"
});

// @desc Configure handler functions to configure HTTP basic headers and accept requests
server.use(restify.plugins.authorizationParser());
server.use(check);
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser({
    mapParams: true
}));

process.on("uncaughtException", (err, req, res, next) => {
    flush(`Uncaught Exception -- The ${server.name} crashed: ${err.stack}`);
});
process.on("unhandledRejection", (reason, promise) => {
    flush(`Unhandled Promise Rejection at ${util.inspect(promise)} \n Reason: ${reason}`);
});

usersRoutes(server);

export default check;
