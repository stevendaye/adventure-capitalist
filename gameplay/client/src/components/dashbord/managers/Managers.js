import React, { Fragment, Component } from "react";
import { connect } from  "react-redux";
import PropTypes from "prop-types";
import { doListManagersThunk } from "../../../thunks/managers";
import Spinner from "../../layout/Spinner";
import Manager from "./Manager";
import title_managers from "../../../assets/vendor/local/miscellaneous/title_managers.png";
import feature_sound_effect from "../../../assets/vendor/local/media/feature_sound_effect.mp3";

class Managers extends Component {
    constructor (props) {
        super(props);

        this.onQuit = this.onQuit.bind(this);
    }

    componentDidMount() {
        this.props.onListManagers();
        this.managersPopup.style.display = "none";
    }

    onQuit() {
        this.managersPopup.style.display = "none";
    }

    render () {
        const { managers, isLoading } = this.props.managers

        return (
            <Fragment>
                <div 
                    id = "managersPopup"
                    className = "managers"
                    ref = { managersPopup => this.managersPopup = managersPopup }
                >
                    {
                        isLoading || managers.length === 0
                        ? <Spinner/>
                        : (
                            <div className = "managers-slices">
                                <span
                                    className = "lead quit"
                                    onClick = { this.onQuit }
                                >
                                    x
                                </span>
                                <img
                                    alt = "Managers Tittle"
                                    width = "325"
                                    src = {title_managers}
                                    className = "title-managers"
                                />
                                <hr/>
                                <p>Managers make life easier.</p>
                                <p className = "managers-intro-text">
                                    Hire one to run your business for you or to maximize efficiency,
                                    all for just one easy payment.
                                </p>
                                {
                                    managers.map(manager =>
                                        <Manager
                                            key = {manager._id}
                                            manager = {manager}
                                            capital = {this.props.capital}
                                            onSubtractCapital = {this.props.onSubtractCapital}
                                        />
                                    )
                                }
                            </div>
                        )       
                    }
                    <audio
                        id = "managerSoundEffect"
                        src = {feature_sound_effect}
                    ></audio>
                </div>
            </Fragment>
        );
    }
}

Managers.propTypes = {
    managers: PropTypes.object.isRequired,
    capital: PropTypes.number,
    onSubtractCapital: PropTypes.func.isRequired,
    onListManagers: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    managers: state.managersState
});

const mapDispatchToProps = dispatch => ({
    onListManagers: () =>
        dispatch(doListManagersThunk())
});

const ConnectedManagers = connect(mapStateToProps, mapDispatchToProps)(Managers);

export default ConnectedManagers;
