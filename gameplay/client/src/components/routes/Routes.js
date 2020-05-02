import React, { Fragment } from "react";
import { Switch, Route } from "react-router";
import PrivateRoute from "./PrivateRoute";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Gameplay from "../dashbord/Gameplay";
import _404 from "../layout/_404";
import Help from "../dashbord/Help";

const Routes = () =>
    <Fragment>
        <Switch>
            <Route exact path = "/register" component = { Register } />
            <Route exact path = "/login" component = { Login } />
            <PrivateRoute exact path = "/gameplay" component = { Gameplay } />
            <Route exact path = "/help" component = { Help } />
            <Route component = { _404 } />
        </Switch>
    </Fragment>

export default Routes;
