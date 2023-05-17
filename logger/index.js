const containerLog = require("./containerLog");
const devLogger = require("./devLogger");
const { NODE_ENV } = process.env;

let logger = null;

if (NODE_ENV === "development") {
  logger = devLogger();
} else {
  logger = containerLog();
}

module.exports = logger;
