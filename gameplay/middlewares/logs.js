import path from "path";
import fs from "fs-extra";
import rfs from "rotating-file-stream";
import DBG from "debug";

const flush = DBG("adventure-capitalist-play:logs-utility");
flush.useColors = true;

let logStream;
if (process.env.REQUEST_LOG_FILE
  && process.env.NODE_ENV === "production") {
  (async () => {
    const logDirectory = path.dirname(process.env.REQUEST_LOG_FILE);
    await fs.ensureDir(logDirectory);
    logStream = rfs(logDirectory, {
      size: "10M",
      interval: "1d",
      compress: "gzip"
    });
  })().catch(err => flush(err));
}

export default logStream;
