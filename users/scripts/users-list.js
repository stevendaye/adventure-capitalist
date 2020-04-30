"use strict";

import restify from "restify-clients";
import util from "util";
import config from "config";
import DBG from "debug";

const debug = DBG("adventure-capitalist-users:list-users");
const flush = DBG("adventure-capitalist-users:list-error");
debug.useColors = true;
flush.useColors = true;

var client = restify.createJsonClient({
  url: `http://127.0.0.1:${process.env.PORT}`,
  version: "*"
});

client.basicAuth("gc_adcap", "JLOAO217-ACKL-R26A-2SEA-8W2LE76IODS7");

(function() {
    client.get(config.get("routes.user.getList"), (err, req, res, obj) => {
        err
        ? flush(`Listing users failed`)
        : debug(`get list of users: ${util.inspect(obj)}`)
      });
})();
