import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BusinessSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    has_manager: {
        type: Boolean,
        required: true
    },
    initial_cost: {
        type: Number,
        required: true
    },
    next_cost: {
        type: Number,
        required: true
    },
    was_bought: {
        type: Boolean,
        required: true
    },
    initial_revenue: {
        type: Number,
        required: true
    },
    current_revenue: {
        type: Number,
        required: true
    },
    initial_time: {
        type: Number,
        required: true
    },
    initial_productivity: {
        type: Number,
        required: true
    },
    next_productivity: {
        type: Number,
        required: true
    },
    coefficient: {
        type: Number,
        required: true
    },
    number_owned: {
        type: Number,
        required: true
    },
    order: Number
});

const Business = mongoose.model("Business", BusinessSchema);

async function create(userid, name, title, has_manager, initial_cost, next_cost, was_bought,
    initial_revenue, current_revenue, initial_time, initial_productivity, next_productivity,
    coefficient, number_owned, order) {

    const business = new Business({userid, name, title, has_manager, initial_cost,
        next_cost, was_bought, initial_revenue, current_revenue, initial_time,
        initial_productivity, next_productivity, coefficient, number_owned, order
    });
    await business.save();
    return business;
}

// @desc on buying a business, update stock, revenue and next cost
async function buy(userid, id, multiplier) {
    const business = await Business.findOne({
        _id: id,
        userid
    });
    
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
            next_cost,
            next_productivity
        });
    }
    return business;
}

// @desc update the 'was_bought' once the user buy a new business initialy
async function acquired (userid, id, status) {
    const business = await Business.findOne({
        _id: id,
        userid
    });
    await business.update({ was_bought: status });
    return business;
}

// @desc Update the 'has_manager' attribute once a manager is hired for a business
async function putManager(userid, business_type, status) {
    const business = await Business.findOne({
        userid,
        name: business_type
    });
    await business.update({ has_manager: status });
    return business;
}

// @desc Upgrade business profit by 3
async function applyUpgrade(userid, business_type) {
    const business = await Business.findOne({
        userid,
        name: business_type
    });

    let initial_revenue = business.initial_revenue * 3;
    let next_revenue = business.current_revenue * 3; 
    let next_cost = business.next_cost * 3;
    let initial_productivity = business.initial_productivity * 3;
    
    await business.update({
        initial_revenue,
        current_revenue: next_revenue,
        next_cost,
        initial_productivity
    });
    return business;
}

async function getOfflineReport(userid, away_time, last_seen) {
    let report, offlineCapital = 0;

    const businesses = await Business.find({ userid });
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
    const businesses = await Business.find({ userid }).sort({ order: 1 });
    return businesses;
}

export { create, buy, acquired, putManager, applyUpgrade, getOfflineReport, getList };
