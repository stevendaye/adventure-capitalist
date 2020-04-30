import express from "express";
import config from "config";
import * as utils from "../middlewares/utilities";
import upgrade from "../controllers/upgrades";

const router = express.Router();

const upgradesRoutes = app => {
    router.post(config.get("routes.upgrade.create"), utils.checkAuthentication, upgrade.create);
    router.delete(config.get("routes.upgrade.apply"), utils.checkAuthentication, upgrade.apply);
    router.get(config.get("routes.upgrade.getList"), utils.checkAuthentication, upgrade.getList);

    app.use(router);
};

export default upgradesRoutes;
