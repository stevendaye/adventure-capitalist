import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import first_move_helper from "../../assets/vendor/local/helpers/first_move_helper.png";
import after_purchase_helper from "../../assets/vendor/local/helpers/after_purchase_helper.png";
import buy_lemonade_helper from "../../assets/vendor/local/helpers/buy_lemonade_helper.png";
import diversify_helper from "../../assets/vendor/local/helpers/diversify_helper.png";
import upgrade_lemonade_helper from "../../assets/vendor/local/helpers/upgrade_lemonade_helper.png";
import hire_manager_helper from "../../assets/vendor/local/helpers/hire_manager_helper.png";
import pro_tip_helper from "../../assets/vendor/local/helpers/pro_tip_helper.png";
import take_break_helper from "../../assets/vendor/local/helpers/take_break_helper.png";
import arrow_multiplier from "../../assets/vendor/local/miscellaneous/arrow_multiplier.png";

class UXHelpers extends Component {
    constructor(props) {
        super(props);

        this.onActivateHelpers = this.onActivateHelpers.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextProps, nextState) {
        this.onActivateHelpers(nextProps);
    }

    onActivateHelpers(props) {
        const { capital, multiplier, businesses, managers, upgrades } = props;

        if (businesses.length !== 0) {

            if (capital <= 4 && businesses[0].next_cost === 4
                && businesses[1].number_owned === 0) {

                this.takeBreakHelper.style.display = "none";
                this.arrowMultiplier.style.display = "none";
                this.proTipHelper.style.display = "none";
                this.hireManagerHelper.style.display = "none";
                this.upgradeLemonadeHelper.style.display = "none";
                this.diversifyHelper.style.display = "none";
                this.buyLemonadeHelper.style.display = "none"
                this.afterPurchaseHelper.style.display = "none";
                this.firstMoveHelper.style.display = "block";

            }
            
            if (capital >= 5 && businesses[0].next_cost === 4 ) {

                this.takeBreakHelper.style.display = "none";
                this.arrowMultiplier.style.display = "none";
                this.proTipHelper.style.display = "none";
                this.hireManagerHelper.style.display = "none";
                this.upgradeLemonadeHelper.style.display = "none";
                this.upgradeLemonadeHelper.style.display = "none";
                this.diversifyHelper.style.display = "none";
                this.firstMoveHelper.style.display = "none";
                this.afterPurchaseHelper.style.display = "none";
                this.buyLemonadeHelper.style.display = "block";

            }
            
            if (capital >= 0 && capital <= 35
                && businesses[0].next_cost !== 4
                && businesses[1].next_cost <= 78
                && businesses[1].number_owned !== 1
                ) {

                this.takeBreakHelper.style.display = "none";
                this.arrowMultiplier.style.display = "none";
                this.proTipHelper.style.display = "none";
                this.hireManagerHelper.style.display = "none";
                this.upgradeLemonadeHelper.style.display = "none";
                this.diversifyHelper.style.display = "none";
                this.buyLemonadeHelper.style.display = "none";
                this.firstMoveHelper.style.display = "none";
                this.afterPurchaseHelper.style.display = "block";

            }

            if (businesses[1].number_owned === 1) {
                this.firstMoveHelper.style.display = "none";
                this.buyLemonadeHelper.style.display = "none";
                this.afterPurchaseHelper.style.display = "none";
            }
            
            if (businesses[1].number_owned === 0 &&
                businesses[1].next_cost === 69 && capital >= 69 ) {
                this.takeBreakHelper.style.display = "none";
                this.arrowMultiplier.style.display = "none";
                this.proTipHelper.style.display = "none";
                this.hireManagerHelper.style.display = "none";
                this.upgradeLemonadeHelper.style.display = "none";
                this.firstMoveHelper.style.display = "none";
                this.afterPurchaseHelper.style.display = "none";
                this.buyLemonadeHelper.style.display = "none";
                this.diversifyHelper.style.display = "block";
            } else {
                this.diversifyHelper.style.display = "none";
            }

            if (capital >= 1000 && capital <= 3000
                && managers.length >= 11 ) {
                this.takeBreakHelper.style.display = "none";
                this.arrowMultiplier.style.display = "none";
                this.proTipHelper.style.display = "none";
                this.upgradeLemonadeHelper.style.display = "none";
                this.firstMoveHelper.style.display = "none";
                this.afterPurchaseHelper.style.display = "none";
                this.buyLemonadeHelper.style.display = "none";
                this.diversifyHelper.style.display = "none";
                this.hireManagerHelper.style.display = "block";
            } else {
                this.hireManagerHelper.style.display = "none";
            }
            
            if (capital >= 250000 && capital <= 450000
                && upgrades.length >= 11 ) {
                this.takeBreakHelper.style.display = "none";
                this.arrowMultiplier.style.display = "none";
                this.proTipHelper.style.display = "none";
                this.hireManagerHelper.style.display = "none";
                this.firstMoveHelper.style.display = "none";
                this.afterPurchaseHelper.style.display = "none";
                this.buyLemonadeHelper.style.display = "none";
                this.diversifyHelper.style.display = "none";
                this.upgradeLemonadeHelper.style.display = "block";
            } else {
                this.upgradeLemonadeHelper.style.display = "none";
            }

            if (capital >= 5000  && capital <= 7000
                && multiplier === 1) {
                this.takeBreakHelper.style.display = "none";
                this.hireManagerHelper.style.display = "none";
                this.firstMoveHelper.style.display = "none";
                this.afterPurchaseHelper.style.display = "none";
                this.buyLemonadeHelper.style.display = "none";
                this.diversifyHelper.style.display = "none";
                this.upgradeLemonadeHelper.style.display = "none";
                this.arrowMultiplier.style.display = "block";
                this.proTipHelper.style.display = "block";
            } else {
                this.arrowMultiplier.style.display = "none";
                this.proTipHelper.style.display = "none";
            }

            if (capital >= 30000 && capital<= 37000
                && (managers.length <= 11 || upgrades.length <= 11)) {
                this.hireManagerHelper.style.display = "none";
                this.firstMoveHelper.style.display = "none";
                this.afterPurchaseHelper.style.display = "none";
                this.buyLemonadeHelper.style.display = "none";
                this.diversifyHelper.style.display = "none";
                this.upgradeLemonadeHelper.style.display = "none";
                this.takeBreakHelper.style.display = "block";
            } else {
                this.takeBreakHelper.style.display = "none";
            }
        }
    }

    render() {

        return (
            <Fragment>
                <div className = "user-helpers">
                    <img
                        alt = "First Move Helper"
                        id = "first-move-helper"
                        src = {first_move_helper}
                        ref = {
                            firstMoveHelper =>
                            this.firstMoveHelper = firstMoveHelper
                        }
                        width = "325px"
                        height = "325px"
                    />
                    <img
                        alt = "After Purchase helper"
                        id = "after-purchase-helper"
                        src = {after_purchase_helper}
                        ref = {
                            afterPurchaseHelper =>
                            this.afterPurchaseHelper = afterPurchaseHelper
                        }
                        width = "325px"
                        height = "325px"
                    />
                    <img
                        alt = "Buy Lemonade Helper"
                        id = "buy-lemonade-helper"
                        src = {buy_lemonade_helper}
                        ref = {
                            buyLemonadeHelper =>
                            this.buyLemonadeHelper = buyLemonadeHelper
                        }
                        width = "325px"
                        height = "325px"
                    />
                    <img
                        alt = "Diversify Helper"
                        id = "diversify-helper"
                        src = {diversify_helper}
                        ref = {
                            diversifyHelper =>
                            this.diversifyHelper = diversifyHelper
                        }
                        width = "325px"
                        height = "325px"
                    />
                    <img
                        alt = "Upgrade Lemonade Helper"
                        id = "upgrade-lemonade-helper"
                        src = {upgrade_lemonade_helper}
                        ref = {
                            upgradeLemonadeHelper =>
                            this.upgradeLemonadeHelper = upgradeLemonadeHelper
                        }
                        width = "325px"
                        height = "325px"
                    />
                    <img
                        alt = "Hire Manager Helper"
                        id = "hire-manager-helper"
                        src = {hire_manager_helper}
                        ref = {
                            hireManagerHelper =>
                            this.hireManagerHelper = hireManagerHelper
                        }
                        width = "325px"
                        height = "325px"
                    />
                    <img
                        alt = "Pro-Tip Helper"
                        id = "pro-tip-helper"
                        src = {pro_tip_helper}
                        ref = {
                            proTipHelper =>
                            this.proTipHelper = proTipHelper
                        }
                        width = "325px"
                        height = "325px"
                    />
                    <img
                        alt = "Arrow Multiplier Helper"
                        id = "arrow-multiplier"
                        src = {arrow_multiplier}
                        ref = {
                            arrowMultiplier =>
                            this.arrowMultiplier = arrowMultiplier
                        }
                        width = "60px"
                    />
                    <img
                        alt = "Take Break Helper"
                        id = "take-break-helper"
                        src = {take_break_helper}
                        ref = {
                            takeBreakHelper =>
                            this.takeBreakHelper = takeBreakHelper
                        }
                        width = "325px"
                        height = "325px"
                    />
                </div>
            </Fragment>
        );
    }
}

UXHelpers.propTypes = {
    capital: PropTypes.number.isRequired,
    multiplier: PropTypes.number.isRequired,
    businesses: PropTypes.array.isRequired,
    managers: PropTypes.array.isRequired,
    upgrades: PropTypes.array.isRequired
};

export default UXHelpers;
