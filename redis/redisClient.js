const redis = require("redis");
const assert = require("assert");
const { REDIS_CONNECTION_URL } = process.env;

assert.ok(
  REDIS_CONNECTION_URL,
  "REDIS_CONNECTION_URL must be provided before using this application"
);

const redisClient = redis.createClient({
  url: REDIS_CONNECTION_URL,
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (error) => {
  console.error("Redis connection error:", error);
});

module.exports = redisClient;
