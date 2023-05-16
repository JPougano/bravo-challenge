const redis = require("redis");
const fs = require("fs");
const assert = require("assert");
const { REDIS_CONNECTION_URL, REDIS_PORT, REDIS_HOST } = process.env;

assert.ok(
  REDIS_CONNECTION_URL,
  "REDIS_CONNECTION_URL must be provided before using this application"
);

const isRunningInContainer =
  fs.existsSync("/.dockerenv") ||
  fs.existsSync("/run/.containerenv") ||
  fs.existsSync("/.sap_btp_in_docker");

const REDIS_CONNECTION = isRunningInContainer
  ? { url: REDIS_CONNECTION_URL }
  : { port: REDIS_PORT, host: REDIS_HOST };

const redisClient = redis.createClient(REDIS_CONNECTION);

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (error) => {
  console.error("Redis connection error:", error);
});

module.exports = redisClient;
