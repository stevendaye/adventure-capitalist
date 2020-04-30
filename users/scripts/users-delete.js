"use strict";

import restify from "restify-clients";
import util from "util";
import DBG from "debug";

const debug = DBG("adventure-capitalist-users:delete-user");
const flush = DBG("adventure-capitalist-users:delete-error");
debug.useColors = true;
flush.useColors = true;

var client = restify.createJsonClient({
  url: `http://127.0.0.1:${process.env.PORT}`,
  version: "*"
});

client.basicAuth("gc_adcap", "JLOAO217-ACKL-R26A-2SEA-8W2LE76IODS7");

(function() {
    client.del(`/users/destroy/${process.argv[2]}`, (err, req, res, obj) => {
        err
          ? flush(`delete user -- User deletion of email ${process.argv[2]}, \n ${err.stack} failed`)
          : debug(`delete user successful: ${util.inspect(obj)}`);
      });
})();
