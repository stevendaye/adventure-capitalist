import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route } from "react-router";
import { Provider } from "react-redux";
import store from "./store";
import setAuthTokenHeader from "./utils/setAuthTokenHeader";
import { doLoadUserThunk } from "./thunks/register";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";
import Routes from "./components/routes/Routes";
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
                                <Routes component = { Routes } />
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
