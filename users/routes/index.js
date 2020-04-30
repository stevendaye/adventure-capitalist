import config from "config";
import DBG from "debug";
import user from "../controllers"

const debug = DBG("adventure-capitalist-users:routes-index");
const flush = DBG("adventure-capitalist-users:routes-error");
debug.useColors = true;
flush.useColors = true;

const userRoutes = server => {
    server.get(config.get("routes.index"), user.index);

    server.post(config.get("routes.user.register"), user.register);
    server.get(config.get("routes.user.find"), user.find);
    server.post(config.get("routes.user.checkPassword"), user.checkPassword);
    server.get(config.get("routes.user.findById"), user.findById);
    server.put(config.get("routes.user.updateStatus"), user.updateStatus);
    server.put(config.get("routes.user.saveCapital"), user.saveCapital);
    server.put(config.get("routes.user.saveLastSeen"), user.saveLastSeen);
    server.get(config.get("routes.user.getAwayTime"), user.getAwayTime);
    server.del(config.get("routes.user.destroy"), user.destroy);
    server.get(config.get("routes.user.getList"), user.getList);

    server.listen(process.env.PORT || config.get("port"), () => {
        debug(`Authentication Server ${server.name} running at ${server.url}`);
    });
};

export default userRoutes;
