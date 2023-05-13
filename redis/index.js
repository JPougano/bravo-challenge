const redisClient = require("./redisClient");

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
    return cachedData;
  };

  set = async (key, value) => {
    await redisClient.set(key, value);
  };
}

module.exports = new Redis();
