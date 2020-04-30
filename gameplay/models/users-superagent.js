import request from "superagent";
import url from "url";
import config from "config";
import util from "util";
import DBG from "debug";

const URL = url.URL;
const debug = DBG("adventure-capitalist-gameplay:users-superagent");
debug.useColors = true;

const reqUrl = path => {
    const requrl = new URL(process.env.USER_MICROSERVICE_HOST);
    requrl.pathname = path;
    return requrl.toString();
};

async function create(id, name, email, password, avatar, capital, started_business,
    last_seen, created) {
    let res = await request
        .post(reqUrl(config.get("routes.user.register")))
        .withCredentials()
        .send({ id, name, email, password, avatar, capital, started_business,
            last_seen, created
        })
        .set("Content-Type",  "application/json")
        .set("Accept", "application/json")
        .auth("gc_adcap", "JLOAO217-ACKL-R26A-2SEA-8W2LE76IODS7");
    debug(`create user: id: ${id}, name: ${name}, email: ${email},
        password: ${password}, avatar: ${avatar}, created: ${created}`
    );
    return res.body;
}

async function find(email) {
    let res = await request
        .get(reqUrl(`${config.get("routes.user.find")}/${email}`))
        .withCredentials()
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .auth("gc_adcap", "JLOAO217-ACKL-R26A-2SEA-8W2LE76IODS7")
    debug(`find user by email: ${util.inspect(res.body)}`);
    return res.body;
}

async function findById(id) {
    let res = await request
        .get(reqUrl(`${config.get("routes.user.findById")}/${id}`))
        .withCredentials()
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .auth("gc_adcap", "JLOAO217-ACKL-R26A-2SEA-8W2LE76IODS7");
    debug(`find user by id: ${util.inspect(res.body)}`);
    return res.body;
}

async function checkPassword(email, password) {
    let res = await request
        .post(reqUrl(`${config.get("routes.user.checkPassword")}`))
        .withCredentials()
        .send({ email, password })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .auth("gc_adcap", "JLOAO217-ACKL-R26A-2SEA-8W2LE76IODS7");
    debug(`checkPassword: ${util.inspect(res.body)}`);
    return res.body;
}

async function updateStatus(id, status) {
    let res = await request
        .put(reqUrl(`${config.get("routes.user.updateStatus")}`))
        .withCredentials()
        .send({ id, status })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .auth("gc_adcap", "JLOAO217-ACKL-R26A-2SEA-8W2LE76IODS7");
    debug(`updateStatus: ${util.inspect(res.body)}`);
    return res.body;
}

async function saveCapital(id, capital) {
    let res = await request
        .put(reqUrl(`${config.get("routes.user.saveCapital")}`))
        .withCredentials()
        .send({ id, capital })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .auth("gc_adcap", "JLOAO217-ACKL-R26A-2SEA-8W2LE76IODS7");
    debug(`saveCapital: ${util.inspect(res.body)}`);
    return res.body;
}

async function saveLastSeen(id, last_date) {
    let res = await request
        .put(reqUrl(`${config.get("routes.user.saveLastSeen")}`))
        .withCredentials()
        .send({ id, last_date })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .auth("gc_adcap", "JLOAO217-ACKL-R26A-2SEA-8W2LE76IODS7");
    debug(`saveLastSeen: ${util.inspect(res.body)}`);
    return res.body;
}

async function getAwayTime(id, log_date) {
    let res = await request
        .get(reqUrl(`/users/get/away-time/${id}/${log_date}`))
        .withCredentials()
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .auth("gc_adcap", "JLOAO217-ACKL-R26A-2SEA-8W2LE76IODS7");
    debug(`getAwayTime: ${util.inspect(res.body)}`);
    return res.body;
}
  
async function destroy(email) {
    let res = await request
        .del(reqURL(`${config.get("routes.user.destroy")}/${email}`))
        .withCredentials()
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .auth("gc_adcap", "JLOAO217-ACKL-R26A-2SEA-8W2LE76IODS7");
    debug(`delete: ${util.inspect(res.body)}`);
    return res.body;
}

export {
    create, find, findById, checkPassword, updateStatus, saveCapital,
    saveLastSeen, getAwayTime, destroy
};
