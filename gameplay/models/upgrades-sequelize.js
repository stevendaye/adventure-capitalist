import Sequelize from "sequelize";
import jsyaml from "js-yaml";
import fs from "fs-extra";

let sqlize;
let SQUpgrade;
let Op = Sequelize.Op;

async function connectDB() {
    if (typeof sqlize === "undefined") {
        const YAML = await fs.readFile(process.env.SEQUELIZE_CONNECT, "utf8");
        const params = await jsyaml.safeLoad(YAML, "utf8");

        sqlize = new Sequelize(params.dbnane, params.username, params.password, params.params);
    }

    if (SQUpgrade) {
        return SQUpgrade.sync();
    }

    SQUpgrade = sqlize.define("Upgrades", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        name: Sequelize.STRING,
        title: Sequelize.STRING,
        business_type: Sequelize.STRING,
        profit: Sequelize.STRING,
        cost: Sequelize.INTEGER,
        userid: Sequelize.STRING,
        order: Sequelize.NUMBER
    });

    return SQUpgrade.sync();
}

async function create(name, title, business_type, profit, cost, userid, order) {
    const SQUpgrade = await connectDB(); 
    const upgrade = await SQUpgrade.create({
        name, title, business_type, profit, cost, userid, order
    });
    return upgrade;
}

async function apply(userid, id) {
    const SQUpgrade = await connectDB();
    const upgrade = await SQUpgrade.findOne({ where: {
        userid: { [Op.eq]: userid },
        id: { [Op.eq]: id }
    } });
    await upgrade.destroy();
}

async function getList (userid) {
    const SQUpgrade = await connectDB();
    const upgrades = await SQUpgrade.findAll({
        where: {
            userid: { [Op.eq]: userid }
        },
        order: [
            ["order", "ASC"]
        ]});
    return upgrades;
}

export { create, apply, getList };
