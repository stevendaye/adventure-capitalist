import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { doLogOut } from "../../actions/auth";
import { doClearBusinesses } from "../../actions/businesses";
import { doClearManagers } from "../../actions/managers";
import { doClearUpgrades } from "../../actions/upgrades";
import adcap_logo from "../../assets/vendor/local/miscellaneous/adcap_logo.png";

const Navbar = ({ auth: { isAuthenticated, isLoading, user }, onLogout}) => {
    const authLinks = (
        <ul>
            <li>
                <Link to = "/gameplay">
                    <span>{user && user.name && user.name.split(" ")[0]}</span>
                </Link>
            </li>
            <li>
                <a href = "#/logout" onClick = { onLogout }>
                    Logout
                </a>
            </li>
            <li>
                <Link to = "/help" > | Help </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li className = "btn btn-primary">
                <span>
                    <Link to = "/register">
                        Create Account
                    </Link>
                </span>
            </li>
            <li>
                <Link to = "/login">Login</Link>
            </li>
            <li>
                <Link to = "/help"> | Help </Link>
            </li>
        </ul>
    );

    return (
        <nav className = "navbar bg-light">
            <Link to = {isAuthenticated ? "/gameplay" : "/"}>
                <img
                    alt = "AdCap Logo"
                    src = {adcap_logo}
                    className ="logo"
                    width = "45"
                    height = "45"
                />
            </Link>
            {
                !isLoading && (
                    <Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>
                )
            }
        </nav>
    );
};

Navbar.propTypes = {
    auth: PropTypes.object.isRequired,
    onLogout: PropTypes.func.isRequired
};

const mapStateToPropsNavbar = state => ({
    auth: state.authState
});

const mapDispatchToPropsNavbar = dispatch => ({
    onLogout: () => [
        dispatch(doLogOut()),
        dispatch(doClearBusinesses()),
        dispatch(doClearManagers()),
        dispatch(doClearUpgrades())
    ]
});

const ConnectedNavbar = connect(mapStateToPropsNavbar, mapDispatchToPropsNavbar)(Navbar);

export default ConnectedNavbar;