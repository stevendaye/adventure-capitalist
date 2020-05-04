// @desc Notification action types
const SET_NOTIFICATION = "SET_NOTIFICATION";
const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

// @desc Authentication action type
const REGISTER_SUCCESS = "REGISTER_SUCCESS";
const REGISTER_FAIL = "REGISTER_FAIL";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAIL = "LOGIN_FAIL";
const LOGOUT = "LOGOUT";

const USER_LOADED = "USER_LOADED";
const AUTH_TOKEN_ERROR = "AUTH_TOKEN_ERROR";

// @desc Business action type
const CREATE_BUSINESSES = "CREATE_BUSINESSES"; 
const BUY_BUSINNESS = "BUY_BUSINNESS";
const UPDATE_ACQUIRED_BUSINESS = "UPDATE_ACQUIRED_BUSINESS";
const PUT_MANAGER = "PUT_MANAGER";
const APPLY_UPGRADE = "APPLY_UPGRADE";
const LIST_BUSINESSES = "LIST_BUSINESSES";
const BUSINESS_FAIL = "BUSINESS_FAIL";
const CLEAR_BUSINESSES = "CLEAR_BUSINESSES";

// @desc Manager action types
const CREATE_MANAGERS = "CREATE_MANAGERS";
const HIRE_MANAGER = "HIRE_MANAGER";
const LIST_MANAGERS = "LIST_MANAGERS";
const MANAGER_FAIL = "MANAGER_FAIL";
const CLEAR_MANAGERS = "CLEAR_MANAGERS";

// @desc Upgrade action types
const CREATE_UPGRADES = "CREATE_UPGRADES";
const MAKE_UPGRADE = "MAKE_UPGRADE";
const LIST_UPGRADES = "LIST_UPGRADES";
const UPGRADE_FAIL = "UPGRADE_FAIL";
const CLEAR_UPGRADES = "CLEAR_UPGRADES";

// @desc Save/update users' capital types
const UPDATE_CAPITAL = "UPDATE_CAPITAL";
const SAVE_CAPITAL = "SAVE_CAPITAL";
const CAPITAL_FAIL = "CAPITAL_FAIL";

// @desc Offline Repoty types
const SAVE_LASTSEEN = "SAVE_LASTSEEN";
const GET_OFFLINE_REPORT = "GET_OFFLINE_REPORT";
const OFFLINE_REPORT_FAIL = "OFFLINE_REPORT_FAIL";

export {
    SET_NOTIFICATION, REMOVE_NOTIFICATION,
    REGISTER_SUCCESS, REGISTER_FAIL,
    LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT,
    USER_LOADED,
    AUTH_TOKEN_ERROR,

    CREATE_BUSINESSES, BUY_BUSINNESS, UPDATE_ACQUIRED_BUSINESS,
    PUT_MANAGER, APPLY_UPGRADE, LIST_BUSINESSES, BUSINESS_FAIL,
    CLEAR_BUSINESSES,

    CREATE_MANAGERS, HIRE_MANAGER, LIST_MANAGERS, MANAGER_FAIL,
    CLEAR_MANAGERS,

    CREATE_UPGRADES, MAKE_UPGRADE, LIST_UPGRADES, UPGRADE_FAIL,
    CLEAR_UPGRADES,
    
    UPDATE_CAPITAL, SAVE_CAPITAL, CAPITAL_FAIL,
    
    SAVE_LASTSEEN, GET_OFFLINE_REPORT, OFFLINE_REPORT_FAIL
};