import express from "express";
import { check } from "express-validator";
import config from "config";
import * as utils from "../middlewares/utilities";
import business from "../controllers/businesses";

const router = express.Router();

const businessesRoutes = app => {
    router.post(config.get("routes.business.create"), utils.checkAuthentication, business.create);
    router.put(config.get("routes.business.buy"), utils.checkAuthentication, business.buy);
    router.put(config.get("routes.business.acquired"), utils.checkAuthentication, business.acquired);
    router.put(config.get("routes.business.putManager"), utils.checkAuthentication, business.putManager);
    router.put(config.get("routes.business.applyUpgrade"), utils.checkAuthentication, business.applyUpgrade);
    router.get(config.get("routes.business.getOfflineReport"), utils.checkAuthentication, business.getOfflineReport);
    router.get(config.get("routes.business.getList"), utils.checkAuthentication, business.getList);

    app.use(router);
};

export default businessesRoutes;
