import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Notifications from "../layout/Notifications";
import doLoginWithErrorCheck from "../../thunks/login";
import PropTypes from "prop-types";
import { getArrayOfObject } from "../layout/Notifications";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            submitted: false
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        const { email, password } = this.state;

        this.props.onLogin(email, password);
        this.setState({ submitted: true });
    }

    // @desc Control register button for allowing a new submission
    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.notifications.length > 0) {
            this.setState({ submitted: false });
        }
    }

    render() {
        const { isAuthenticated } = this.props;
        const { email, password, submitted } = this.state;
        
        if (isAuthenticated) {
            return <Redirect to = "/gameplay"/>
        }

        return (
            <Fragment>
                <div className = "auth-login">
                    <div className = "login pull-right">
                        <Notifications/>
                        <p className = "medium">
                            <i className = "fa fas-money"></i>
                            Business Account
                        </p>
                        <form onSubmit = { this.onSubmit } autoComplete="off">
                            <div className = "form-group">
                                <input
                                    type = "email"
                                    placeholder = "Email"
                                    name = "email"
                                    value = { email }
                                    onChange = { this.onChange }
                                    required
                                />
                            </div>
                            <div className = "form-group">
                                <input
                                    type = "password"
                                    placeholder = "Password"
                                    name = "password"
                                    value = { password }
                                    onChange = { this.onChange }
                                    minLength = "6"
                                    required
                                />
                            </div>
                            <input
                                type = {submitted ? "button" : "submit"}
                                className = {submitted ? "btn btn-dim" : "btn btn-login"}
                                value = {submitted ? "Loging you into your account..." : "Login" }
                            />
                            <p className = "my-1 info">
                                Don't you have a businsess account? No Problem!
                                <br/>
                                <Link to = "/register" >Create Account</Link>
                            </p>
                        </form>
                    </div>
                    <div className = "clear"></div>
                </div>
            </Fragment>
        );
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool,
    notifications: PropTypes.array,
    onLogin: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.authState.isAuthenticated,
    notifications: getArrayOfObject(state.notificationsState)
});

const mapDispatchToProps = dispatch => ({
    onLogin: (email, password) =>
        dispatch(doLoginWithErrorCheck(email, password))
});

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default ConnectedLogin;
