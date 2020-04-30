import React , {Fragment} from "react";
import { Link } from "react-router-dom";

const _404 = () =>
    <Fragment>
        <div className = "not-found text-center">
            <h1 className = "large text-primary">
                PAGE NOT FOUND
            </h1>
            <p className = "small">
                Looks like you have followed a broken link or entered a URL that
                does not exist yet in this game.
            </p>
            <Link to = "/"> Come back to the game</Link>
        </div>
    </Fragment>

export default _404;
