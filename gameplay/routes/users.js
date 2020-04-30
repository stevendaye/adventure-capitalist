import express from "express";
import { check } from "express-validator"
import config from "config";
import user from "../controllers/users";
import * as utils from "../middlewares/utilities";

const router = express.Router();

const usersRoutes = app => {
    router.post(config.get("routes.user.register"), [
        check("name", "Name is required!").not().isEmpty(),
        check("email", "Provide a valid email address!").isEmail(),
        check("password", "Provide a password greater than 5 characters!").isLength({ min: 6 })
    ], user.register);

    router.post(config.get("routes.user.login"), [
        check("email", "Provide a valid email address!").isEmail(),
        check("password", "Password is Required!").exists()
    ], user.login);

    router.put(config.get("routes.user.saveCapital"), utils.checkAuthentication, user.saveCapital);
    router.put(config.get("routes.user.saveLastSeen"), utils.checkAuthentication, user.saveLastSeen);

    app.use(router);
};

export default usersRoutes;
