import util from "util";
import DBG from "debug";

const flush = DBG("adventure-capitalist-gameplay:handle-error");
flush.useColors = true;

const _404 = (req, res, next) => {
    res.status(404).json({
        title: "404 NOT FOUND",
        message: "It seems that someone took a wrong turn here!"
    });
};

const _500 = (err, req, res, next) => {
    util.log(err.message);
    flush(`${err.status || 500} -- ${err.message}`);
    res.status(err.status || 500).json({
        message: err.message,
        err: {}
    });
};

export { _404, _500 };
