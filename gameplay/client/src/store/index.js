import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../reducers";

const logger = createLogger();
const middleware = [thunk, logger];

const  store = createStore(rootReducer, undefined, composeWithDevTools(applyMiddleware(...middleware)));

export default store;
