import Sequelize from "sequelize";
import jsyaml from "js-yaml";
import bcrypt from "bcrypt";
import fs from "fs-extra";

let sqlize;
let SQUser;
let Op = Sequelize.Op

async function connectDB() {
    if (typeof sqlize === "undefined") {
        const YAML = await fs.readFile(process.env.SEQUELIZE_CONNECT, "utf8");
        const params = await jsyaml.safeLoad(YAML, "utf8");

        sqlize = new Sequelize(params.dbname, params.username, params.password, params.params);
    }

    if (SQUser) {
        return SQUser.sync();
    }

    SQUser = sqlize.define("Users", {
        id: {
            type: Sequelize.STRING,
            primaryKey: true
        },
        name: Sequelize.STRING,
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: Sequelize.STRING,
        avatar: Sequelize.STRING,
        capital: Sequelize.BIGINT,
        started_business: Sequelize.BOOLEAN,
        last_seen: Sequelize.DATE,
        created: Sequelize.DATE,
    });
    return SQUser.sync();
}

async function create(id, name, email, password, avatar, capital, started_business,
    last_seen, created) {
    const SQUser = await connectDB();
    const user = SQUser.create({
        id, name, email, password, avatar, capital, started_business, last_seen, created
    });
    return user;
}

async function find(email) {
    const SQUser = await connectDB();
    const user = await SQUser.findOne({ where: { email: {[Op.eq]: email} }});
    if (!user) {
        return {
            found: false,
            email
        };
    }
    return {
        found: true,
        email,
        message: "This user already exists",
        sanitize: sanitizer(user)
    };
}

async function findById(id) {
    const SQUser = await connectDB();
    const user = await SQUser.findOne({ where: { id: {[Op.eq]: id} }});
    if (!user) {
        return {
            found: false,
            id
        };
    }
    return {
        found: true,
        id,
        sanitize: sanitizer(user)
    };
}

async function checkPassword(email, password) {
    const SQUser = await connectDB();
    const user = await SQUser.findOne({ where: { email: {[Op.eq]: email} }});
    if (!user) {
        return {
            verified: false,
            email,
            message: "Invalid Credentials"
        };
    }

    const isMatched = await bcrypt.compare(password, user.password);
    if (user.email === email && isMatched) {
        return {
            verified: true,
            email,
            id: user.id
        };
    } else {
        return {
            verified: false,
            email,
            message: "Invalid Credentials"
        };
    }
}

// @update the started_business attribute on creation of new businesses
async function upadateStatus(id, status) {
    const SQUser = await connectDB();
    const user = await SQUser.findOne({ where: { id: {[Op.eq]: id} } });
    if (!user) {
        throw new Error(`We seem to find no user of id ${id}`);
    }
    await user.update({ started_business: status });
    return user;
}

async function saveCapital(id, capital) {
    const SQUser = await connectDB();
    const user = await SQUser.findOne({ where: { id: {[Op.eq]: id} } });
    if (!user) {
        throw new Error(`We seem to find no user of id ${id}`);
    }
    await user.update({ capital });
    return user;
}

async function saveLastSeen(id, last_date) {
    const SQUser = await connectDB();
    const user = await SQUser.findOne({ where: { id: {[Op.eq]: id} } });
    if (!user) {
        throw new Error(`We seem to find no user of id ${id}`);
    }
    await user.update({ last_seen: last_date });
    return user;
}

async function getAwayTime(id, log_date) {
    const SQUser = await connectDB();
    const user = await SQUser.findOne({ where: { id: {[Op.eq]: id} } });

    const logDate = new Date(log_date);
    const lastDate = new Date(user.last_seen);

    const awayTime = logDate-lastDate;
    return {awayTime, lastSeen: user.last_seen};
}

async function destroy(email) {
    const SQUser = await connectDB();
    const user = await SQUser.findOne({ where: { email: {[Op.eq]: email} }});
    if (!user) {
        throw new Error(`We seem to find no user of email ${email}`);
    }
    await user.destroy();
}

async function getList() {
    const SQUser = await connectDB();
    const users = await SQUser.findAll({});
    return users.map(user => sanitizer(user));
}

// @desc Sanitize user to filter out password for security reason
function sanitizer(user) {
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        capital: user.capital,
        started_business: user.started_business,
        last_seen: user.last_seen,
        created: user.created
    };
}

export {
    create, find, findById, checkPassword, destroy,
    upadateStatus, saveCapital, saveLastSeen, getAwayTime, getList
};
