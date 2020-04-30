import jwt from "jsonwebtoken";
import config from "config";
import util from "util";
import DBG from "debug";

const debug = DBG("adventure-capitalist-gameplay:jwt-verify");
const flush = DBG("adventure-capitalist-gameplay:jwt-error");
debug.useColors = flush.useColors = true;

const checkAuthentication = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({message: "No token found. Authorization denied!"});
    }

    try {
        const decoded = jwt.verify(token, config.get("auth.jwtToken"));
        req.user = decoded.user;
        debug(`req.user: ${util.inspect(req.user)}`);
        next();
    } catch (err) {
        flush(`Token ${token} is not valid`);
        res.status(401).json({ error: err, message: "Token Not Valid" })
    }
};

export { checkAuthentication };
