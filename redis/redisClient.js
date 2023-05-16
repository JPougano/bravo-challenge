const redis = require("redis");
const CONFIG = require("../config");

const redisClient = redis.createClient(CONFIG.REDIS_CONNECTION_URL);

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (error) => {
  console.error("Redis connection error:", error);
});

module.exports = redisClient;
