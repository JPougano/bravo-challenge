const { createLogger, format, transports } = require("winston");
const { timestamp, combine, printf, colorize, errors, json } = format;
const { LOG_LEVEL, NODE_ENV, DB_CONNECTION_URI_DEV_LOGGER } = process.env;

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
  ];

  if (NODE_ENV === "development") {
    transportArray.push(
      new transports.MongoDB({
        level: "warn",
        db: DB_CONNECTION_URI_DEV_LOGGER,
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
      })
    );
  }

  const logger = createLogger({
    level: LOG_LEVEL,
    defaultMeta: { service: "user-service" },
    transports: transportArray,
  });

  return logger;
};

module.exports = logger();
