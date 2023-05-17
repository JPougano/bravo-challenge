const { createLogger, format, transports } = require("winston");
const { MongoDB } = require("winston-mongodb");
const CONFIG = require("../config");
const { timestamp, combine, printf, colorize, errors, json } = format;
const { LOG_LEVEL } = process.env;

const logger = () => {
  const consoleFormat = printf(({ level, message, timestamp, stack }) => {
    return `${level} [${timestamp}]: ${stack || message}`;
  });

  const mongodbFormat = printf(({ level, message, timestamp, stack }) => {
    return `${level} [${timestamp}]: ${stack || message}`;
  });

  const transportArray = [
    new transports.Console({
      format: combine(
        colorize(),
        format.metadata(),
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        errors({ stack: true }),
        consoleFormat
      ),
    }),
    new MongoDB({
      level: "warn",
      db: CONFIG.DB_CONNECTION_URI_LOGGER,
      collection: "bravo-logger",
      format: combine(
        timestamp(),
        errors({ stack: true }),
        format.uncolorize(),
        format.metadata(),
        json(),
        mongodbFormat
      ),
      options: { useUnifiedTopology: true },
      storeHost: true,
    }),
  ];

  const logger = createLogger({
    level: LOG_LEVEL,
    defaultMeta: { service: "user-service" },
    transports: transportArray,
  });

  return logger;
};

module.exports = logger();
