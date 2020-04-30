import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import doSetNotificationsThunk from "../../../thunks/notifications";
import { doHireManagerThunk } from "../../../thunks/managers";
import hire_btn_blue from "../../../assets/vendor/local/miscellaneous/hire_btn_blue.png";
import hire_btn_grey from "../../../assets/vendor/local/miscellaneous/hire_btn_grey.png";

class Manager extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            managerTitle: null
        };

        this.onHireManager = this.onHireManager.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        const { title } = this.props.manager;
        import(`../../../assets/vendor/local/managers/${title}.png`)
        .then(module => this._isMounted && this.setState({
            managerTitle: module.default
        }));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    onHireManager(id, business_type, manager_cost) {
        const { capital, businesses} = this.props;
        const managerSoundEffect = document.getElementById("managerSoundEffect");

        if (business_type !== "Unlocker of EZ Upgrade") {
            // @desc Check first if he owns at least 1 business
            const business = businesses.filter(business =>
                business.name === business_type
            );

            if (capital >= manager_cost) {
                if (business["0"].number_owned >= 1) {
                    this._isMounted && this.props.onDoHireManager(id, business_type);
                    this._isMounted && this.props.onSubtractCapital(manager_cost);
                    managerSoundEffect && managerSoundEffect.play();
                } else {
                    this.props.onSetNotification(
                        `You must have at least 1 business running to hire a manager.
                        Currently, you own ${business["0"].number_owned}
                        ${business["0"].name}. Start buying one!`, "warning"
                    );
                }
            }
        }
    }

    render() {
        const { managerTitle } = this.state;
        const { id, business_type, cost } = this.props.manager;
        const { capital } = this.props

        return (
            <Fragment>
                <div className = "manager">
                    <img
                        alt = "Manager Description"
                        src = {managerTitle}
                        className = "manager-description"
                    />
                    <img
                        alt = "Hire Button"
                        src = {
                            cost && capital >= cost
                            ? hire_btn_blue
                            : hire_btn_grey
                        }
                        onClick = { () => {this.onHireManager(id, business_type, cost) }}
                        width = "145"
                        height = "90"
                        className = "hire-btn"
                    />
                </div>
            </Fragment>
        );
    }
}

Manager.propTyps = {
    user: PropTypes.object.isRequired,
    businesses: PropTypes.array.isRequired,
    capital: PropTypes.number.isRequired,
    manager: PropTypes.object.isRequired,
    onSubtractCapital: PropTypes.func.isRequired,
    onDoHireManager: PropTypes.func.isRequired,
    onSetNotification: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    user: state.authState.user,
    businesses: state.businessesState.businesses,
});

const mapDispatchToProps = dispatch => ({
    onDoHireManager: (id, business_type) =>
        dispatch(doHireManagerThunk(id, business_type)),
    onSetNotification: (message, alert) =>
        dispatch(doSetNotificationsThunk(message, alert))
});

const ConnectedManager = connect(mapStateToProps, mapDispatchToProps)(Manager);

export default ConnectedManager;
