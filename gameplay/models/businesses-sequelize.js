import Sequelize from "sequelize";
import jsyaml from "js-yaml";
import fs from "fs-extra";

let sqlize;
let SQBusiness;
let Op = Sequelize.Op;

async function connectDB() {
    if (typeof sqlize === "undefined") {
        const YAML = await fs.readFile(process.env.SEQUELIZE_CONNECT, "utf8");
        const params = await jsyaml.safeLoad(YAML, "utf8");

        sqlize = new Sequelize(params.dbnane, params.username, params.password, params.params);
    }

    if (SQBusiness) {
        return SQBusiness.sync();
    }

    SQBusiness = sqlize.define("Businesses", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        name: Sequelize.STRING,
        title: Sequelize.STRING,
        has_manager: Sequelize.BOOLEAN,
        initial_cost: Sequelize.INTEGER,
        next_cost: Sequelize.BIGINT,
        was_bought: Sequelize.BOOLEAN,
        initial_revenue: Sequelize.BIGINT,
        current_revenue: Sequelize.BIGINT,
        initial_time: Sequelize.INTEGER,
        initial_productivity: Sequelize.INTEGER,
        next_productivity: Sequelize.INTEGER,
        coefficient: Sequelize.NUMBER,
        number_owned: Sequelize.INTEGER,
        userid: Sequelize.STRING,
        order: Sequelize.NUMBER
    });

    return SQBusiness.sync();
}

async function create(name, title, has_manager, initial_cost, next_cost, was_bought,
    initial_revenue, current_revenue, initial_time, initial_productivity, next_productivity,
    coefficient, number_owned, userid, order) {
    
    const SQBusiness = await connectDB();
    const business = await SQBusiness.create({name, title, has_manager, initial_cost,
        next_cost, was_bought, initial_revenue, current_revenue, initial_time,
        initial_productivity, next_productivity, coefficient, number_owned, userid, order
    });
    return business;
}

// @desc on buying a business, update stock, revenue and next cost
async function buy(userid, id, multiplier) {
    const SQBusiness = await connectDB();
    const business = await SQBusiness.findOne({ where: {
        userid: { [Op.eq]: userid },
        id: { [Op.eq]: id }
    }});
    
    let next_owned = business.number_owned += multiplier;
    let next_revenue = business.current_revenue += (business.initial_revenue * multiplier);
    let next_cost = business.next_cost * business.coefficient;
    let next_productivity = business.initial_productivity * next_owned;

    if (business.number_owned === 1) {
        await business.update({
            number_owned: next_owned,
        });
    } else {
        await business.update({
            number_owned: next_owned,
            current_revenue: next_revenue,
            next_cost: next_cost,
            next_productivity
        });
    }
    
    return business;
}

// @desc update the 'was_bought' once the user buy a new business initialy
async function acquired (userid, id, status) {
    const SQBusiness = await connectDB();
    const business = await SQBusiness.findOne({ where: {
        userid: { [Op.eq]: userid },
        id: { [Op.eq]: id }
    } });
    await business.update({ was_bought: status });
    return business;
}

// @desc Update the 'has_manager' attribute once a manager is hired for a business
async function putManager(userid, business_type, status) {
    const SQBusiness = await connectDB();
    const business = await SQBusiness.findOne({ where: {
        userid: { [Op.eq]: userid },
        name: { [Op.eq]: business_type }
    } });
    await business.update({ has_manager: status });
    return business;
}

// @desc Upgrade business profit by 3
async function applyUpgrade(userid, business_type) {
    const SQBusiness = await connectDB();
    const business = await SQBusiness.findOne({ where: {
        userid: { [Op.eq]: userid },
        name: { [Op.eq]: business_type }
    } });

    let initial_revenue = business.initial_revenue * 3;
    let next_revenue = business.current_revenue * 3; 
    let next_cost = business.next_cost * 3;
    let initial_productivity = business.initial_productivity * 3;
    
    await business.update({
        initial_revenue: initial_revenue,
        current_revenue: next_revenue,
        next_cost: next_cost,
        initial_productivity
    });
    return business;
}

async function getOfflineReport(userid, away_time, last_seen) {
    let report, offlineCapital = 0;

    const SQBusiness = await connectDB();
    const businesses = await SQBusiness.findAll({
        where: {
            userid: { [Op.eq]: userid }
        }
    });
    const managedBusinesses = businesses.filter(business =>
        business.has_manager === true
    );

    if (managedBusinesses.length > 0) {
        for (let business of managedBusinesses) {
            offlineCapital += (business.initial_productivity * (away_time/1000));
        }
        report = {
            awayTime: away_time,
            lastSeen: last_seen,
            capital: offlineCapital,
            isRunByManagers: true
        }
    } else {
        report = {
            awayTime: away_time,
            lastSeen: last_seen,
            capital: offlineCapital,
            isRunByManagers: false
        };
    }
    return report;
}

async function getList(userid) {
    const SQBusiness = await connectDB();
    const businesses = await SQBusiness.findAll({
        where: {
            userid: { [Op.eq]: userid }
        },
        order: [
            ["order", "ASC"]
        ]});
    return businesses;
}

export { create, buy, acquired, putManager, applyUpgrade, getOfflineReport, getList };
