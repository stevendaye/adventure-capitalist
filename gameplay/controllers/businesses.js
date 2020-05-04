import DBG from "debug";
import util from "util";
import config from "config";
import * as BusinessModel from "../models/businesses-mongodb";
import * as UserModel from "../models/users-superagent";

const debug = DBG("adventure-capitalist-gameplay:business-controllers");
const flush = DBG("adventure-capitalist-gameplay:business-error");
debug.useColors = flush.useColors = true;

export default {
    // @access Private
    // @route POST /businesses/create
    // @desc Prepare environment by Creating businesses for every new users
    async create(req, res, next) {
        try {
            let createdBusinesses;
            const userBusinesses = [];
            const businesses = req.body.businesses;
            businesses.map(business => {
                userBusinesses.push({
                    userid: req.user.id,
                    name: business.name,
                    title: business.title,
                    has_manager: business.has_manager,
                    initial_cost: business.initial_cost,
                    next_cost: business.next_cost,
                    was_bought: business.was_bought,
                    initial_revenue: business.initial_revenue,
                    current_revenue: business.current_revenue,
                    initial_time: business.initial_time,
                    initial_productivity: business.initial_productivity,
                    next_productivity: business.next_productivity,
                    coefficient: business.coefficient,
                    number_owned: business.number_owned,
                    order: business.order
                });;
            });
            
            createdBusinesses = userBusinesses.map( async business =>
                await BusinessModel.create(
                    business.userid, business.name, business.title, business.has_manager,
                    business.initial_cost, business.next_cost, business.was_bought,
                    business.initial_revenue, business.current_revenue, business.initial_time,
                    business.initial_productivity, business.next_productivity,
                    business.coefficient, business.number_owned, business.order
                )
            );

            // @desc Set to "true" the started_business attribute of the user after creation of businesses
            await UserModel.updateStatus(req.user.id, true);

            debug(`create businesses: ${util.inspect(userBusinesses)}`);
            res.json(await Promise.all(createdBusinesses));
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.business.create")} --\n
                Server Error. Creation of businesses failed!`
            );
        }
    },

    // @access Private
    // @route POST /businesses/buy
    async buy(req, res, next) {
        try {
            const { id, multiplier } = req.body;
            const business = await BusinessModel.buy(req.user.id, id, multiplier);
            debug(`buy business: ${util.inspect(business)}`);
            res.json(business);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.business.buy")} -- \n
                Server Error. Buying a business failed!`
            );
        }
    },

    // @access Private
    // @route POST /businesses/acquired
    // @desc Update the 'was_bought' attribute of a business
    async acquired(req, res, next) {
        try {
            const { id, status } = req.body;
            const business = await BusinessModel.acquired(req.user.id, id, status);
            debug(`acquired a business: ${business}`);
            res.json(business);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.business.acquired")} -- \n
                Server Error. Updating was_bought attribute failed!`
            );
        }
    },

    // @access Private
    // @route POST /businesses/put-manager
    // @desc Update the 'has_manager' attribute of a business
    async putManager(req, res, next) {
        try {
            const { business_type, status } = req.body;
            const business = await BusinessModel.putManager(req.user.id, business_type, status);
            debug(`update manager status: ${business}`);
            res.json(business);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.business.putManager")} -- \n
                Server Error. Putting a manger failed!`
            );
        }
    },

    // @access Private
    // @route PUT /businesses/apply-upgrade
    // @desc Apply upgrade to give the business 3 times profit
    async applyUpgrade(req, res, next) {
        try {
            const business = await BusinessModel.applyUpgrade(req.user.id, req.body.business_type);
            debug(`apply upgrade of business: ${req.body.business_type} -- Business ${business}`);
            res.json(business);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.business.applyUpgrade")} -- \n
                Server Error. Upgrading business profit failed!`
            );
        }
    },

    async getOfflineReport(req, res, next) {
        try {
            const time = await UserModel.getAwayTime(req.user.id, req.params.log_date);
            const report = await BusinessModel.getOfflineReport(req.user.id, time.awayTime, time.lastSeen);
            debug(`get offline report: ${util.inspect(report)}`);
            res.json(report);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.business.getOfflineReport")} -- \n
                Server Error. Getting offline report failed!`
            );
        }
    },

    // @access Private
    // @route GET /businesses/list
    async getList(req, res, next) {
        try {
            let businesses = await BusinessModel.getList(req.user.id);
            if (!businesses) {
                businesses = [];
            }
            debug(`get list of businesses: ${util.inspect(businesses)}`);
            res.json(businesses);
        } catch (err) {
            flush(err.stack);
            res.status(500).send(`${config.get("routes.business.getList")} -- \n
                Server Error. Listing of businesses failed!`
            );
        }
    }
};
