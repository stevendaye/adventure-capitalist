import React, {Fragment, Component} from "react";
import adcap_head from "../../assets/vendor/local/miscellaneous/adcap_head.png"
import feature_managers from "../../assets/vendor/local/miscellaneous/feature_managers.png";
import feature_upgrades from "../../assets/vendor/local/miscellaneous/feature_upgrades.png";

class Features extends Component {
    constructor (props) {
        super(props);

        this.onPopupManagersWindow = this.onPopupManagersWindow.bind(this);
        this.onPopupgradesWindow = this.onPopupgradesWindow.bind(this);
    }

    onPopupManagersWindow() {
       document.getElementById("upgradesPopup")
        .style.display = "none";
        document.getElementById("managersPopup")
        .style.display = "block";
    }

    onPopupgradesWindow() {
        document.getElementById("managersPopup")
        .style.display = "none";
        document.getElementById("upgradesPopup")
        .style.display = "block";
    }

    render () {

        return (
            <Fragment>
                <div className = "features-displays">
                    <div className = "features">
                        <img
                            alt = "AdCap Icon"
                            src = {adcap_head}
                            width = "175" height = "170"
                            className = "d-block"
                        />
                        <img
                            alt = "Managers Button"
                            src = {feature_managers}
                            width = "175" height = ""
                            className = "d-block feature-managers"
                            onClick = { this.onPopupManagersWindow }
                        />
                        <img
                            alt = "Upgrades Button"
                            src = {feature_upgrades}
                            width = "175" height = ""
                            className = "d-block feature-upgrades"
                            onClick = { this.onPopupgradesWindow }
                        />
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default Features
