const redisClient = require("./redisClient");
const logger = require("../logger");

class Redis {
  constructor() {
    if (Redis.instance) {
      return Redis.instance;
    }
    Redis.instance = this;
  }
  connect = async () => {
    await redisClient.connect();
  };

  quit = async () => {
    await redisClient.quit();
  };

  get = async (key) => {
    const cachedData = await redisClient.get(key);
    logger.info("Cache hitted", key);
    return cachedData;
  };

  set = async (key, value) => {
    await redisClient.set(key, JSON.stringify(value));
    logger.info("Cache hitted", { key, value });
  };
}

module.exports = new Redis();
