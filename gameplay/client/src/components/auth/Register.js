import React, { Component, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Notifications from "../layout/Notifications";
import doSetNotificationsThunk from "../../thunks/notifications";
import doRegisterThunk from "../../thunks/register";
import { getArrayOfObject } from "../layout/Notifications";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPass: "",
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
        const { name, email, password, confirmPass } = this.state;
        if (password !== confirmPass) {
            this.props.onSetNotification("Passwords do not match", "danger");
        } else {
            this.props.onRegister(name, email, password);
            this.setState({ submitted: true });
        }
    }

    // @desc Control register button for allowing a new submission
    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        if (nextProps.notifications.length > 0) {
            this.setState({ submitted: false });
        }
    }
 
    render() {
        const { isAuthenticated } = this.props;
        const { name, email, password, confirmPass, submitted } = this.state;

        if (isAuthenticated) {
            return <Redirect to = "/gameplay"/>
        }

        return (
            <Fragment>
                <div className = "auth-register">
                    <div className = "register pull-right">
                        <Notifications/>
                        <p className = "medium">
                            <i className = "fa fas-money"></i>
                            New Account
                        </p>
                        <form onSubmit = { this.onSubmit } autoComplete="off">
                            <div className = "form-group">
                                <input
                                    type = "text"
                                    placeholder = "Name"
                                    name = "name"
                                    value = { name }
                                    onChange = { this.onChange }
                                    required 
                                />
                            </div>
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
                            <div className = "form-group">
                                <input
                                    type = "password"
                                    placeholder = "Confirm Password"
                                    name = "confirmPass"
                                    value = { confirmPass }
                                    onChange = { this.onChange }
                                    minLength = "6"
                                    required
                                />
                            </div>
                            <input
                                type = {submitted ? "button" : "submit"}
                                className = {submitted ? "btn btn-dim" : "btn btn-register"}
                                value = {submitted ? "Creating you a businsess account..." : "Create Account" }
                            />
                            <p className = "info">
                                Already have  businsess account? Great!
                                <br/>
                                <Link to = "/login" >Login</Link>
                            </p>
                        </form>
                    </div>
                    <div className = "clear"></div>
                </div>
            </Fragment>
        );
    }
}

Register.propTypes = {
    isAuthenticated: PropTypes.bool,
    notifications: PropTypes.array,
    onSetNotification: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.authState.isAuthenticated,
    notifications: getArrayOfObject(state.notificationsState)
});

const mapDispatchToProps = dispatch => ({
    onSetNotification: (message, alert) =>
        dispatch(doSetNotificationsThunk(message, alert)),
    onRegister: (name, email, password) =>
        dispatch(doRegisterThunk(name, email, password))
});

const ConnectedRegister = connect(mapStateToProps, mapDispatchToProps)(Register);

export default ConnectedRegister;
