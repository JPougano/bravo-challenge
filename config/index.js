const fs = require("fs");
const assert = require("assert");

const isRunningInContainer =
  fs.existsSync("/.dockerenv") ||
  fs.existsSync("/run/.containerenv") ||
  fs.existsSync("/.sap_btp_in_docker");

assert.ok(
  process.env.REDIS_CONNECTION_URL,
  "REDIS_CONNECTION_URL must be provided before using this application"
);

assert.ok(
  process.env.DB_CONNECTION_URI,
  "DB_CONNECTION_URI must be provided before using this application"
);

const containerEnvs = {
  DB_CONNECTION_URI: process.env.DB_CONNECTION_URI,
  REDIS_CONNECTION_URL: { url: process.env.REDIS_CONNECTION_URL },
};

const localEnvs = {
  DB_CONNECTION_URI: process.env.DB_CONNECTION_URI_DEV,
  REDIS_CONNECTION_URL: {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
  },
};

module.exports = isRunningInContainer ? containerEnvs : localEnvs;
