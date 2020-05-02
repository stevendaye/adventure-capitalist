import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const getAccurateAwayTime =  (awayTime, lastSeen) => {
    let accurateTime;

    const nowTimestamp = new Date().getTime();
    const lastTimestamp = new Date(lastSeen).getTime();
    const days = (nowTimestamp - lastTimestamp)/(24*60*60*1000);

    const time = new Date();
    const hours = time.setTime(awayTime) && time.getHours();
    const minutes = time.setTime(awayTime) && time.getMinutes();
    const seconds = time.setTime(awayTime) && time.getSeconds();
    
    if (days >= 1) {
        accurateTime = `${Math.floor(days)} day(s) ${hours} hours ${minutes} minutes
        and ${seconds} seconds`
    } else {
        accurateTime = `${hours} hour(s) ${minutes} minute(s) and ${seconds} seconds`
    }
    return accurateTime;
};

class Report extends Component {
    constructor(props) {
        super(props);

        this.onCloseReport = this.onCloseReport.bind(this);
    }

    componentDidMount() {
        const  { show } = this.props;
        this.offline.style.display = show;
    }

    onCloseReport() {
        document.getElementsByClassName("offline")[0]
        .style.display = "none";
    }

    render() {
        const {
            report: {
                isLoading,
                offline: {
                    isRunByManagers, awayTime, capital, lastSeen
                }
            },
            auth
        } = this.props;

        return (
            <Fragment>
                <div
                    className = "offline"
                    id = "report"
                    ref = { offline => this.offline = offline }
                >
                    {
                        !isLoading && isRunByManagers &&
                        <div className = "offline-report">
                            <aside>
                                <p>
                                    { (auth.user && auth.user.name) ? auth.user.name : "Capitalist" }
                                </p>
                                <div>
                                    You have been away for
                                    <p className = "away-time">
                                        {getAccurateAwayTime(awayTime, lastSeen)}
                                    </p>
                                </div>
                                <div>
                                    While away, your managers made you gain the amount of
                                    <p className = "offline-capital word-wrap">
                                        ${capital.toLocaleString()}
                                    </p>
                                </div>
                                <button
                                    className = "close-report-btn"
                                    onClick = { this.onCloseReport }
                                >
                                    Mamamia!
                                </button>
                            </aside>
                        </div>
                    }
                   
                </div>
            </Fragment>
        );
    }
}

Report.propTypes = {
    auth: PropTypes.object.isRequired,
    report: PropTypes.object.isRequired,
    show: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    auth: state.authState,
    report: state.reportState
});

const ConnectedReport = connect(mapStateToProps)(Report);

export default ConnectedReport;
