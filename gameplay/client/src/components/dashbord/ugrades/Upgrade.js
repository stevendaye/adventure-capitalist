import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { doMakeUpgradeThunk } from "../../../thunks/upgrades";
import doSetNotificationsThunk from "../../../thunks/notifications";
import buy_btn_orrange from "../../../assets/vendor/local/miscellaneous/buy_btn_orrange.png";
import buy_btn_grey from "../../../assets/vendor/local/miscellaneous/buy_btn_grey.png";

class Upgrade extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            upgradeTitle: null
        };

        this.onUpgrade = this.onUpgrade.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        const { title } = this.props.upgrade;
        import(`../../../assets/vendor/local/upgrades/${title}.png`)
        .then(module => this._isMounted && this.setState({
            upgradeTitle: module.default
        }));
    }

    onUpgrade(id, business_type, upgrade_cost) {
        const { businesses, capital } = this.props;
        const upgradeSoundEffect = document.getElementById("upgradeSoundEffect");

        if (business_type !== "Monopoly All") {
        
            // @desc Check first if he owns at least 1 business
            const business = businesses.filter(business =>
                business.name === business_type
            );

            if (capital >= upgrade_cost) {
                if (business["0"].number_owned >= 1) {
                    this._isMounted && this.props.onMakeUpgrade(id, business_type);
                    this._isMounted && this.props.onSubtractCapital(upgrade_cost);
                    upgradeSoundEffect && upgradeSoundEffect.play();
                } else {
                    this.props.onSetNotification(
                        `You must have at least 1 business running to upgrade.
                        Currently, you own ${business["0"].number_owned}
                        ${business["0"].name}. Start buying one!`, "warning"
                    );
                }
            }
        }
    }

    render() {
        const { capital } = this.props;
        const { upgradeTitle } = this.state;
        const { id, business_type, cost } = this.props.upgrade;

        return (
            <Fragment>
                <div className = "upgrade">
                    <img
                        alt = "Upgrade Description"
                        src = {upgradeTitle}
                        className = "upgrade-description"
                    />
                    <img
                        alt = "Buy Button"
                        src = {
                            cost && capital >= cost
                            ? buy_btn_orrange
                            : buy_btn_grey
                        }
                        onClick = { () => {this.onUpgrade(id, business_type, cost) }}
                        width = "145"
                        height = "90"
                        className = "buy-btn"
                    />
                </div>
            </Fragment>
        );
    }
}

Upgrade.propTypes = {
    businesses: PropTypes.array.isRequired,
    upgrade: PropTypes.object.isRequired,
    capital: PropTypes.number.isRequired,
    onSubtractCapital: PropTypes.func.isRequired,
    onMakeUpgrade: PropTypes.func.isRequired,
    onSetNotification: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    businesses: state.businessesState.businesses
});

const mapDispatchToProps = dispatch => ({
    onMakeUpgrade: (id, business_type) =>
        dispatch(doMakeUpgradeThunk(id, business_type)),
    onSetNotification: (message, alert) =>
        dispatch(doSetNotificationsThunk(message, alert))
});

const ConnectedUpgrade = connect(mapStateToProps, mapDispatchToProps)(Upgrade);

export default ConnectedUpgrade;
