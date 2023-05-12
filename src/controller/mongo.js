const mongoService = require("../service/mongo");

const getCount = async (req, res) => {
  try {
    const count = await mongoService.getDbCount();
    res.status(200).json(count);
  } catch (error) {
    console.log(error);
    res.status(404).json(error);
  }
};

module.exports = { getCount };
