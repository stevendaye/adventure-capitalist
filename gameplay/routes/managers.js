import express from "express";
import config from "config";
import * as utils from "../middlewares/utilities";
import manager from "../controllers/managers";

const router = express.Router();

const managersRoutes = app => {
    router.post(config.get("routes.manager.create"), utils.checkAuthentication, manager.create);
    router.delete(config.get("routes.manager.hire"), utils.checkAuthentication, manager.hire);
    router.get(config.get("routes.manager.getList"), utils.checkAuthentication, manager.getList);

    app.use(router);
};

export default managersRoutes;
