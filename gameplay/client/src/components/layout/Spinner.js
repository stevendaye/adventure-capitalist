import React, {Fragment} from "react";

const Spinner = () =>
    <Fragment>
        <div className = "fa-2x spinner">
            <i className = "fas fa-spinner fa-spin"></i>
            <span className = "d-block spinner-text">
                Setting up Environment...
            </span>
        </div>
    </Fragment>

export default Spinner;
