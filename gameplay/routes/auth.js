import express from "express";
import config from "config";
import auth from "../controllers/auth";
import * as utils from "../middlewares/utilities";

const router = express.Router();

const authRoutes = app => {
    router.get(config.get("routes.auth"), utils.checkAuthentication, auth.index);

    app.use(router);
};

export default authRoutes;
