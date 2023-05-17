const assert = require("assert");
const { NODE_ENV } = process.env;

assert.ok(NODE_ENV, "NODE_ENV must be provided before using this application");

assert.ok(
  process.env.REDIS_CONNECTION_URL,
  "REDIS_CONNECTION_URL must be provided before using this application"
);

assert.ok(
  process.env.DB_CONNECTION_URI,
  "DB_CONNECTION_URI must be provided before using this application"
);

assert.ok(
  process.env.DB_CONNECTION_URI_LOGGER,
  "DB_CONNECTION_URI_LOGGER must be provided before using this application"
);

const isRunningInContainer = NODE_ENV === "development" ? false : true;
const containerEnvs = {
  DB_CONNECTION_URI: process.env.DB_CONNECTION_URI,
  REDIS_CONNECTION_URL: { url: process.env.REDIS_CONNECTION_URL },
  DB_CONNECTION_URI_LOGGER: process.env.DB_CONNECTION_URI_LOGGER,
};

const localEnvs = {
  DB_CONNECTION_URI: process.env.DB_CONNECTION_URI_DEV,
  REDIS_CONNECTION_URL: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  },
  DB_CONNECTION_URI_LOGGER: process.env.DB_CONNECTION_URI_DEV_LOGGER,
};

module.exports = isRunningInContainer ? containerEnvs : localEnvs;
