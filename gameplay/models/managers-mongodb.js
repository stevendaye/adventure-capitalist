import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ManagerSchema = new Schema({
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
    role: {
        type: String,
        required: true
    },
    cost: Number,
    order: Number
});

const Manager = mongoose.model("manager", ManagerSchema);

async function create(userid, name, title, business_type, role, cost, order) {
    const manager = new Manager({
        userid, name, title, business_type, role, cost, order
    });
    await manager.save();
    return manager;
}

// @desc delete manager from the user's mamagers list once hired
async function hire(userid, id) {
    await Manager.findOneAndRemove({ userid, _id: id });
}

async function getList(userid) {
    const managers = await Manager.find({ userid }).sort({ order: 1 });
    return managers;
}

export { create, hire, getList };
