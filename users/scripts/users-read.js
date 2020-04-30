"use strict";

import restify from "restify-clients";
import util from "util";
import DBG from "debug";

const debug = DBG("adventure-capitalist-users:read-user");
const flush = DBG("adventure-capitalist-users:read-error");
debug.useColors = true;
flush.useColors = true;

var client = restify.createJsonClient({
    url: `http://127.0.0.1:${process.env.PORT}`,
    version: "*"
});

client.basicAuth("gc_adcap", "JLOAO217-ACKL-R26A-2SEA-8W2LE76IODS7");

(function() {
    client.get(`/users/find/${process.argv[2]}`, (err, req, res, obj) => {
      err
      ? flush(`find user -- Read user of email ${process.argv[2]}, \n ${err.stack} failed`)
      : debug(`find user successful: ${util.inspect(obj)}`);
    });
})();
