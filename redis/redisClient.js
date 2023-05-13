const redis = require("redis");
const assert = require("assert");
const { REDIS_HOST, REDIS_PORT } = process.env;

assert.ok(
  REDIS_HOST,
  "REDIS_HOST must be provided before using this application"
);
assert.ok(
  REDIS_PORT,
  "REDIS_PORT must be provided before using this application"
);

const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (error) => {
  console.error("Redis connection error:", error);
});

module.exports = redisClient;
