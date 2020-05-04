import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { doBuyBusinessThunk } from "../../../thunks/businesses";

let currentManager;

class Business extends Component {
    _isMounted = false;
    _hasNewRevenue = null;

    constructor(props) {
        super(props);

        this.state = {
            foregroundTitle: null,
            backgroundTitle: null,
            isClicked: false,
            isProgressing: false
        };

        this.onSwitchBackground = this.onSwitchBackground.bind(this);
        this.onSwitchForeground = this.onSwitchForeground.bind(this);
        this.onActivateManager = this.onActivateManager.bind(this);
        this.onUpdateCapital = this.onUpdateCapital.bind(this);
        this.onShowProgress = this.onShowProgress.bind(this);
        this.onPurchase = this.onPurchase.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this._isMounted = true;

        const { title } = this.props.business
        import(`../../../assets/vendor/local/businesses/forefront/${title}.png`)
        .then(module => this._isMounted && this.setState({
            foregroundTitle: module.default
        }));

        import(`../../../assets/vendor/local/businesses/background/${title}.png`)
        .then(module => this._isMounted && this.setState({
            backgroundTitle: module.default
        }));

        setTimeout(() => {
            if (this.props.auth.user) {    
                const { business: {
                    has_manager, current_revenue, initial_time, userid
                } } = this.props;
                const { user: { _id } } = this.props.auth;

                if (has_manager && userid === _id) {
                    this._isMounted && this.onActivateManager(
                        has_manager, current_revenue, initial_time
                    )
                }
            }
        }, 500);
    }

    // @desc Update revenue and activate manager when has_manager = "true"
    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        const { business: {
            has_manager, current_revenue, initial_time
        } } = nextProps;

        if (nextProps.business !== this.props.business) {
            if (has_manager) {
                this._hasNewRevenue = current_revenue
            }

            if(has_manager !== this.props.business.has_manager) {
                this._isMounted && this.onActivateManager(
                    has_manager, current_revenue, initial_time
                );
            }
        }
    }

    componentWillUnmount() {
        this._isMounted = false;
        clearInterval(currentManager);
    }

    onSwitchBackground() {
        !this.props.business.has_manager &&
        (this.img.src = this.state.backgroundTitle);   
    }

    onSwitchForeground() {
        this.img.src = this.state.foregroundTitle;
    }

    onClick(current_revenue, number_owned, has_manager, initial_time) {
        const { isClicked, isProgressing } = this.state;

        !isClicked && this.onUpdateCapital(
            current_revenue, number_owned,
            has_manager, initial_time
        );

        !isProgressing && number_owned >= 1 && !has_manager
        && this.onShowProgress(initial_time);
    }

    // @desc Update Capital in local state component in the parent element(Gameplay)
    onUpdateCapital(revenue, number_owned, has_manager, initial_time) {
        if (number_owned >= 1 && !has_manager) {
            this.setState({ isClicked: true });
            setTimeout(() => {
                this.props.onAddCapital(revenue);
                this.setState({ isClicked: false });
            }, initial_time);
        }
    }

    // @desc Buy a buniness
    onPurchase(e, _id, next_cost) {
        e.stopPropagation();
        const { capital, multiplier  } = this.props;

        if (capital >= next_cost * multiplier) {
            this.props.onBuyBusiness(_id, multiplier);
            this.props.onSubtractCapital((next_cost * multiplier));
        }
    }

    // @desc On mounting or manager hire, activate manager if has_mananger="true"
    onActivateManager(has_manager, current_revenue, initial_time) {
        if (has_manager) {
            this.onShowProgress(initial_time);
            currentManager = this._isMounted && setInterval(() => {
                this.props.onAddCapital(
                    this._hasNewRevenue ? this._hasNewRevenue : current_revenue
                );
                this.onShowProgress(initial_time);
            }, initial_time);
        }
    }

    onShowProgress(timer) {
        this.setState({ isProgressing: true });
        const bar = this.progressBar;
        let width = 0;

        let iterator = setInterval(() => {
            if (width >= 100) {
                clearInterval(iterator);
                bar && (bar.style.width = "0%");
            } else {
                width += 1;
                bar && (bar.style.width = `${width}%`);
            }
        }, timer/100);
       setTimeout(() => {
           this.setState({ isProgressing: false });
       }, timer);
    }

    render () {
        let timing = new Date();

        const { foregroundTitle } = this.state;
        const { capital, multiplier, business: {
            _id, has_manager, current_revenue, next_cost, initial_time, number_owned
        }  } = this.props;


        return (
            <Fragment>
                <div
                    className = "business"
                    onClick = { () => { this.onClick(
                        current_revenue, number_owned,
                        has_manager, initial_time
                    )} }
                >
                    <img
                        alt = "Business Type Icon"
                        src = { foregroundTitle }
                        width = "90"
                        height = "90"
                        onMouseOver = { this.onSwitchBackground }
                        onMouseOut = { this.onSwitchForeground }
                        ref = { img => this.img = img }
                    />
                    <div className = "business-data text-center">
                        <div className = "number-owned">
                            {number_owned}
                        </div>

                        <div className = "current-revenue text-center">
                            ${current_revenue.toLocaleString(
                                undefined,
                                {maximumFractionDigits: 2}
                            )}
                            <div
                                className = "progress-bar"
                                ref = {progressBar => this.progressBar = progressBar}
                            ></div>
                        </div>

                        <div
                            className = "next-cost text-center"
                            onClick = { (e) => { this.onPurchase(e, _id, next_cost) } }
                            style = {{
                                backgroundColor: (capital >= multiplier * next_cost)
                                ? "#f7931e" : "#e6e9f8",
                                color: (capital >= multiplier * next_cost)
                                ? "#ffffff" : "#b1aeae"
                            }}
                        >
                            <span className = "buy">Buy</span>
                            {
                                multiplier === 1
                                ? <span className = "x-multiplier">x1</span>
                                : <span className = "x-multiplier">x10</span>
                            }
                            ${(next_cost * multiplier).toLocaleString(
                                undefined,
                                {maximumFractionDigits: 2}
                            )}
                        </div>

                        <div className = "initial-time text-center">
                            {   timing.setTime(initial_time) &&
                                `${timing.getHours()}:${timing.getMinutes()}:${timing.getSeconds()}`
                            }
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

Business.propTypes = {
    auth: PropTypes.object.isRequired,
    business: PropTypes.object.isRequired,
    capital: PropTypes.number.isRequired,
    multiplier: PropTypes.number.isRequired,
    onSubtractCapital: PropTypes.func.isRequired,
    onBuyBusiness: PropTypes.func.isRequired,
    onAddCapital: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.authState
});

const mapDispacthToProps = dispatch => ({
    onBuyBusiness: (_id, multiplier) =>
        dispatch(doBuyBusinessThunk(_id, multiplier))
});

const ConnectedBusiness = connect(mapStateToProps, mapDispacthToProps)(Business);

export default ConnectedBusiness;
