import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

const middleware = [thunk];

const  store = createStore(rootReducer, undefined, applyMiddleware(...middleware));

export default store;
