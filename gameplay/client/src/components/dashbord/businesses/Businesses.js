import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { doListBusinessesThunk } from "../../../thunks/businesses";
import Spinner from "../../layout/Spinner";
import Business from "./Business";

class Businesses extends Component {

    componentDidMount() {
        this.props.onListBusinesses();
    }

    render () {
        const { businesses, isLoading } = this.props.businesses;

        return (
            <Fragment>
                <div className = "businesses">
                    {
                        (
                            isLoading || businesses.length === 0
                        )
                        ? <Spinner/>
                        : (
                            // @desc sliced businesses to be adaptable for mobile view
                            <div className = "businesses-slices">
                                <div className = "slice slice-1">
                                    {businesses.slice(0, 5).map(business =>
                                        <Business
                                            key = {business._id}
                                            business = {business}
                                            capital = {this.props.capital}
                                            multiplier = {this.props.multiplier}
                                            onSubtractCapital = {this.props.onSubtractCapital}
                                            onAddCapital = { this.props.onAddCapital }
                                        />
                                    )}
                                </div>
                                <div className = "slice slice-2">
                                    {businesses.slice(5, 10).map(business =>
                                        <Business
                                            key = {business._id}
                                            business = {business}
                                            capital = {this.props.capital}
                                            multiplier = {this.props.multiplier}
                                            onSubtractCapital = {this.props.onSubtractCapital}
                                            onAddCapital = { this.props.onAddCapital }
                                        />
                                    )}
                                </div>
                            </div>
                        )
                    }
                </div>
            </Fragment>
        );
    }
}

Businesses.propTypes = {
    capital: PropTypes.number,
    multiplier: PropTypes.number.isRequired,
    businesses: PropTypes.object.isRequired,
    onSubtractCapital: PropTypes.func.isRequired,
    onAddCapital: PropTypes.func.isRequired,
    onListBusinesses: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    businesses: state.businessesState
});

const mapDispatchToProps = dispatch => ({
    onListBusinesses: () =>
        dispatch(doListBusinessesThunk())
});

const ConnectedBusninesses = connect(mapStateToProps, mapDispatchToProps)(Businesses);

export default ConnectedBusninesses;
