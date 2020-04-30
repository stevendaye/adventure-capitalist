import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Help = ({ auth: { user } }) =>
    <Fragment>
        <div className = "info-help">
            <div className = "help">
                Hello {( user && user.name) ? user.name.split(" ")[0] : "Capitalist" }
                <br/> <br/>
                <p>
                    It is Lord Lutterford. Adventure Capitalist is an idle business
                    sim-game. The basic idea behind the game is to purchase a business,
                    win capital from that business, upgrade the business and then purchase
                    more businesses.
                </p>
                <br/>
                <p>
                    The more you click, the more you make money. Once you purchase a
                    business, it will take some time to gain the capital. The timer
                    is shown at the top left corner of the business' icon.
                </p>
                <br/>
                <p>
                    In order to automate this, you can hire a manager who can run the
                    business for you, so you don’t have to click manually anymore.
                    Then you can upgrade the business and gain even more money.
                    But don't worry, I am here to help. Great? Then, have fun.
                </p>
            </div>
            <div className = "clear"></div>
        </div>
    </Fragment>

Help.propTypes = {
    auth: PropTypes.object
};

const mapStateToPropsHelp = state => ({
    auth: state.authState
});

const ConnectedHelp = connect(mapStateToPropsHelp)(Help);

export default ConnectedHelp;
