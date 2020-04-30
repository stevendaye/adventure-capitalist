import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { doListUpgradesThunk } from "../../../thunks/upgrades";
import Spinner from "../../layout/Spinner";
import Upgrade from "./Upgrade";
import title_upgrades from "../../../assets/vendor/local/miscellaneous/title_upgrades.png";
import feature_sound_effect from "../../../assets/vendor/local/media/feature_sound_effect.mp3";

class Upgrades extends Component {
    constructor (props) {
        super(props);

        this.onQuit = this.onQuit.bind(this);
    }

    componentDidMount() {
        this.props.onListManagers();
        this.upgradesPopup.style.display = "none";
    }

    onQuit() {
        this.upgradesPopup.style.display = "none";
    }

    render () {
        const { upgrades, isLoading } = this.props.upgrades;

        return (
            <Fragment>
                <div
                    id = "upgradesPopup"
                    className = "upgrades"
                    ref = { upgradesPopup => this.upgradesPopup = upgradesPopup }
                >
                    {
                        isLoading || upgrades.length === 0
                        ? <Spinner/>
                        : (
                            <div className = "upgrades-slices">
                                <span
                                    className = "lead quit"
                                    onClick = { this.onQuit }
                                >
                                    x
                                </span>
                                <img
                                    alt = "Upgrades Title"
                                    width = "325"
                                    src = {title_upgrades}
                                    className = "title-upgrades"
                                />
                                <hr/>
                                <p>You gotto spend money to make money</p>
                                <p className = "upgrades-intro-text">
                                    Purchase these fine quality upgrades to give your
                                    business a boost.
                                </p>
                                {
                                    upgrades.map(upgrade =>
                                        <Upgrade
                                            key = {upgrade.id}
                                            upgrade = {upgrade}
                                            capital = {this.props.capital}
                                            onSubtractCapital = {this.props.onSubtractCapital}
                                        />
                                    )
                                }
                            </div>
                        )
                    }
                    <audio
                        id = "upgradeSoundEffect"
                        src = {feature_sound_effect}
                    ></audio>
                </div>
            </Fragment>
        );
    }
}

Upgrades.propTypes = {
    upgrades: PropTypes.object.isRequired,
    capital: PropTypes.number,
    onSubtractCapital: PropTypes.func.isRequired,
    onListManagers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    upgrades: state.upgradesState
});

const mapDispatchToProps = dispatch => ({
    onListManagers: () =>
        dispatch(doListUpgradesThunk())
});

const ConnectedUpgrades = connect(mapStateToProps, mapDispatchToProps)(Upgrades);

export default ConnectedUpgrades;
