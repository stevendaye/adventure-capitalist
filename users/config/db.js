import mongoose from "mongoose";
import config from "config";
import DBG from "debug";

const debug = DBG("adventure-capitalist-users:connect-db");
const flush = DBG("adventure-capitalist-users:error-db");
debug.useColor = true;
flush.useColor = true;

const db = config.get("db.mongoURI");

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false ,
            useUnifiedTopology: true
        });
        debug("MongoDB Atlas Connected");
    } catch (err) {
        flush(`Failed to connect to MongoDB Atlas -- ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;
