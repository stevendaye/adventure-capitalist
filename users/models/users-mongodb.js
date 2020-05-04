import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: String,
    capital: Number,
    started_business: Boolean,
    last_seen: {
        type: Date,
        default: Date.now,
        required: true
    },
    created: {
        type: Date,
        default: Date.now,
        required: true
    }
});

const User = mongoose.model("user", UserSchema);

async function create(name, email, password, avatar, capital, started_business) {
    const user = new User({
        name, email, password, avatar, capital, started_business
    });
    await user.save();
    return user;
}

async function find(email) {
    const user = await User.findOne({ email});
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
    const user = await User.findById({ _id: id }).select("-password");
    if (!user) {
        return {
            found: false,
            _id: id
        };
    }
    return {
        found: true,
        _id: id,
        sanitize: sanitizer(user)
    };
}

async function checkPassword(email, password) {
    const user = await User.findOne({ email });
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
            id: user._id
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
    const user = await User.findOneAndUpdate(
        { _id: id },
        { started_business: status }
    );
    return user;
}

async function saveCapital(id, capital) {
    const user = await User.findOneAndUpdate(
        { _id: id },
        { capital }
    );
    return user;
}

async function saveLastSeen(id, last_date) {
    const user = await User.findOneAndUpdate(
        { _id: id },
        { last_seen: last_date }
    );
    return user;
}

async function getAwayTime(id, log_date) {
    const user = await User.findOne({ _id: id });

    if (!user) {
        throw new Error(`We seem to find no user of id ${id}`);
    }

    const logDate = new Date(log_date);
    const lastDate = new Date(user.last_seen);

    const awayTime = logDate-lastDate;
    return {
        awayTime,
        lastSeen: user.last_seen
    };
}

async function destroy(email) {
    await User.findOneAndRemove({ email });
}

async function getList() {
    const users = await User.find({});
    return users.map(user => sanitizer(user));
}

// @desc Sanitize user to filter out password for security reason
function sanitizer(user) {
    return {
        _id: user._id,
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
