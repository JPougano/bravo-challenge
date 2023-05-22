const redis = require("redis");
const CONFIG = require("../config");
const logger = require("../logger");

const redisClient = redis.createClient(CONFIG.REDIS_CONNECTION_URL);

redisClient.on("connect", () => {
  logger.debug("Redis client connected");
});

redisClient.on("error", (error) => {
  logger.error("Redis connection error:", error);
});

module.exports = redisClient;
