import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import { Provider } from "react-redux";
import PrivateRoute from "./components/routes/PrivateRoute";
import store from "./store";
import setAuthTokenHeader from "./utils/setAuthTokenHeader";
import { doLoadUserThunk } from "./thunks/register";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Gameplay from "./components/dashbord/Gameplay";
import _404 from "./components/layout/_404";
import Help from "./components/dashbord/Help";
import Footer from "./components/layout/Footer";
import './App.css';

localStorage.token && setAuthTokenHeader(localStorage.token);

const App = () => {
    useEffect(() => {
        store.dispatch(doLoadUserThunk());
    }, []);

    return (
        <Provider store = { store }>
            <Router>
                <Fragment>
                    <div className = "wrapper">
                        <div className = "container">
                            <Navbar/>
                            <Switch>
                                <Route exact path = "/" component = { Landing } />
                                <Route exact path = "/register" component = { Register } />
                                <Route exact path = "/login" component = { Login } />
                                <PrivateRoute exact path = "/gameplay" component = { Gameplay } />
                                <Route exact path = "/help" component = { Help } />
                                <Route component = { _404 } />
                            </Switch>
                            <Footer/>
                        </div>
                    </div>
                </Fragment>
            </Router>
        </Provider>
    );
};

export default App;
