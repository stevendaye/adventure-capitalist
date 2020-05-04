import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UpgradeSchema = new Schema({
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
    business_type: {
        type: String,
        required: true
    },
    profit: {
        type: String,
        required: true
    },
    cost: Number,
    order: Number
});

const Upgrade = mongoose.model("upgrade", UpgradeSchema);

async function create(userid, name, title, business_type, profit, cost, order) {
    const upgrade = new Upgrade({
        userid, name, title, business_type, profit, cost, order
    });
    await upgrade.save();
    return upgrade;
}

async function apply(userid, id) {
    await Upgrade.findOneAndRemove({ userid, _id: id});
}

async function getList (userid) {
    const upgrades = await Upgrade.find({ userid }).sort({ order: 1 });
    return upgrades;
}

export { create, apply, getList };
