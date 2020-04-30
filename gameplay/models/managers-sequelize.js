import Sequelize from "sequelize";
import jsyaml from "js-yaml";
import fs from "fs-extra";

let sqlize;
let SQManager;
let Op = Sequelize.Op;

async function connectDB() {
    if (typeof sqlize === "undefined") {
        const YAML = await fs.readFile(process.env.SEQUELIZE_CONNECT, "utf8");
        const params = await jsyaml.safeLoad(YAML, "utf8");

        sqlize = new Sequelize(params.dbnane, params.username, params.password, params.params);
    }

    if (SQManager) {
        return SQManager.sync();
    }

    SQManager = sqlize.define("Managers", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        name: Sequelize.STRING,
        title: Sequelize.STRING,
        business_type: Sequelize.STRING,
        role: Sequelize.STRING,
        cost: Sequelize.INTEGER,
        userid: Sequelize.STRING,
        order: Sequelize.NUMBER
    });

    return SQManager.sync();
}

async function create(name, title, business_type, role, cost, userid, order) {
    const SQManager = await connectDB();
    const manager = await SQManager.create({
        name, title, business_type, role, cost, userid, order
    });
    return manager;
}

// @desc delete manager from the user's mamagers list once hired
async function hire(userid, id) {
    const SQManager = await connectDB();
    const manager = await SQManager.findOne({ where: {
        userid: { [Op.eq]: userid },
        id: { [Op.eq]: id }
    } });
    await manager.destroy();
}

async function getList(userid) {
    const SQManager = await connectDB();
    const managers = await SQManager.findAll({
        where: {
            userid: { [Op.eq]: userid }
        },
        order: [
            ["order", "ASC"]
        ]});
    return managers;
}

export { create, hire, getList };
