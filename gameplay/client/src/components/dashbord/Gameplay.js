import businesses from "../../config/businesses.json";
import managers from "../../config/managers.json";
import upgrades from "../../config/upgrades.json";
import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Features from "./Features";
import doCreateBusinessesThunk from "../../thunks/businesses";
import doCreateManagersThunk from "../../thunks/managers";
import doCreateUpgrades from "../../thunks/upgrades";
import Businesses from "./businesses/Businesses";
import Managers from "./managers/Managers";
import Upgrades from "./ugrades/Upgrades";
import Report from "./Report";
import { doSaveUserCapitalThunk } from "../../thunks/register";
import { doSaveLastSeenThunk, doGetOfflineReportThunk } from "../../thunks/report";
import Notifications from "../layout/Notifications";
import mulitplier_x01 from "../../assets/vendor/local/miscellaneous/multiplier_x01.png"
import mulitplier_x10 from "../../assets/vendor/local/miscellaneous/multiplier_x10.png";
import UXHelpers from "./UXHelpers";
import background_sound_effect from "../../assets/vendor/local/media/background_sound_effect.mp3";
import multiplier_sound_effect from "../../assets/vendor/local/media/multiplier_sound_effect.mp3";

class Gameplay extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            capital: 0,
            multiplier: 1,
            toggled: true,
        };

        this.onToggleMultiplier = this.onToggleMultiplier.bind(this);
        this.onSubtractCapital = this.onSubtractCapital.bind(this);
        this.onAddCapital = this.onAddCapital.bind(this);

        window.onbeforeunload = () => {
            const { capital } = this.state;

            localStorage.setItem("capital", capital);
            this.props.onSaveCapital(capital);
            this.props.onSaveLastSeen(new Date());

            return undefined;
        };
    };

    componentDidMount() {
        this._isMounted = true;

        const oldCapital = parseInt(localStorage.capital);
        this._isMounted && this.setState({ capital: oldCapital });
        localStorage.setItem("multiplier", this.state.multiplier);

        setTimeout(() => {
            this.props.onGetOfflineReport(new Date());
        }, 1000);
    }

    componentWillUnmount() {
        this._isMounted = false;
        const { capital } = this.state
        
        localStorage.setItem("capital", capital);
        this.props.onSaveCapital(capital);
        this.props.onSaveLastSeen(new Date());

        document.getElementById("backgroundSoundEffect").pause();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.multiplier !== this.state.multiplier) {
            localStorage.setItem("multiplier", this.state.multiplier);
        }
        if (prevProps.auth !== this.props.auth) {
            const { user: { capital } } = this.props.auth;
            this.setState({ capital });
        }

        // @desc Set up game environment for new players
        if (prevProps.auth !== this.props.auth) {
            const {
                isAuthenticated,
                user: { started_business }
            } = this.props.auth;

            if (this._isMounted && isAuthenticated && !started_business) {
                this.props.onCreateBusinesses(businesses);
                this.props.onCreateManagers(managers);
                this.props.onCreateUpgrades(upgrades);
            }
        }
    }

    // @desc Play background game song after game environment setup
    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        const backgroundSoundEffect = document.getElementById("backgroundSoundEffect");

        if (nextProps.businesses !== this.props.businesses) {
            if (nextProps.businesses.length > 0) {
                backgroundSoundEffect && backgroundSoundEffect.play();
            }
        }
    }

    // @desc On buy, manager hire/business upgrade, deduct the cost from current capital
    onSubtractCapital(cost) {
        let { capital } = this.state;
        this.setState({ capital: Math.floor(capital - cost) });
    }

    // @desc Add capital on business click/manager activation/offline capital
    onAddCapital(revenue) {
        let { capital } = this.state;
        this.setState({ capital: Math.floor(capital + revenue) });
    }

    // @desc Change multiplier to x1/x10 on each toggle and play sound effect
    onToggleMultiplier() {
        const { toggled } = this.state;
        const multiplierSoundEffect = document.getElementById("multiplierSoundEffect");

        if (toggled) {
            this.setState({ multiplier: 10, toggled: false });
            this.multiplier.src = mulitplier_x10;
        } else {
            this.setState({ multiplier: 1, toggled: true });
            this.multiplier.src = mulitplier_x01;
        }
        multiplierSoundEffect &&  multiplierSoundEffect.play();
    }

    render() {
        const { capital, multiplier } = this.state;
        const { businesses, managers, upgrades, report: { offline } } = this.props;

        return (
            <Fragment>
                <section className = "gameplay">
                    <Notifications/>
                    <Features/>
                    <UXHelpers
                        capital = {capital}
                        multiplier = {multiplier}
                        businesses = {businesses}
                        managers = {managers}
                        upgrades = {upgrades}
                    />
                    {
                        Object.keys(offline).length > 0 && offline.isRunByManagers &&
                        <Report onAddCapital = {this.onAddCapital}/>
                    }
                    <p className = "adcap-name">Adventure Capitalist</p>
                    <div className = "playground">
                        <img
                            alt = "Multiplier Icon"
                            src = {mulitplier_x01}
                            width = "100"
                            height = "100"
                            className = "multiplier"
                            onClick = { this.onToggleMultiplier }
                            ref = { multiplier => this.multiplier = multiplier }
                        />
                        <span className = "capital x-large word-wrap">
                            ${capital.toLocaleString()}
                        </span>
                        <Businesses
                            capital = {capital}
                            multiplier = {multiplier}
                            onSubtractCapital = { this.onSubtractCapital }
                            onAddCapital = {this.onAddCapital}
                        />
                        <Managers
                            capital = {capital}
                            onSubtractCapital = {this.onSubtractCapital}
                        />
                        <Upgrades
                            capital = {capital}
                            onSubtractCapital = {this.onSubtractCapital}
                        />
                    </div>
                    <audio loop id = "backgroundSoundEffect" src = {background_sound_effect}></audio>
                    <audio id = "multiplierSoundEffect" src = {multiplier_sound_effect}></audio>
                </section>
            </Fragment>
        );
    }
}

Gameplay.propTypes = {
    auth: PropTypes.object.isRequired,
    businesses: PropTypes.array.isRequired,
    managers: PropTypes.array.isRequired,
    upgrades: PropTypes.array.isRequired,
    report: PropTypes.object.isRequired,
    onCreateBusinesses: PropTypes.func.isRequired,
    onCreateManagers: PropTypes.func.isRequired,
    onCreateUpgrades: PropTypes.func.isRequired,
    onSaveCapital: PropTypes.func.isRequired,
    onSaveLastSeen: PropTypes.func.isRequired,
    onGetOfflineReport: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.authState,
    businesses: state.businessesState.businesses,
    managers: state.managersState.managers,
    upgrades: state.upgradesState.upgrades,
    report: state.reportState
});

const mapDispatchToProps = dispatch => ({
    onCreateBusinesses: businesses =>
        dispatch(doCreateBusinessesThunk(businesses)),
    onCreateManagers: managers =>
        dispatch(doCreateManagersThunk(managers)),
    onCreateUpgrades: upgrades =>
        dispatch(doCreateUpgrades(upgrades)),
    onSaveCapital: capital =>
        dispatch(doSaveUserCapitalThunk(capital)),
    onSaveLastSeen: lastSeen =>
        dispatch(doSaveLastSeenThunk(lastSeen)),
    onGetOfflineReport: logDate =>
        dispatch(doGetOfflineReportThunk(logDate))
});

const ConnectedGameplay = connect(mapStateToProps, mapDispatchToProps)(Gameplay);

export default ConnectedGameplay;
