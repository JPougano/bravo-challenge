const { createLogger, format, transports } = require("winston");
const { timestamp, combine, errors, json } = format;
const { LOG_LEVEL } = process.env;

const containerLog = () => {
  return createLogger({
    level: LOG_LEVEL,
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports: [new transports.Console()],
  });
};

module.exports = containerLog;
