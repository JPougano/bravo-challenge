const { createLogger, format, transports } = require("winston");
const { timestamp, combine, printf, colorize, errors } = format;
const { LOG_LEVEL } = process.env;

const devLogger = () => {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${level} [${timestamp}]: ${stack || message}`;
  });

  return createLogger({
    level: LOG_LEVEL,
    format: combine(
      colorize(),
      timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    ),
    defaultMeta: { service: "user-service" },
    transports: [new transports.Console()],
  });
};

module.exports = devLogger;
