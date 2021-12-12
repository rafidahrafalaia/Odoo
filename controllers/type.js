const models = require("../models");
const uuid = require("uuid");
const Sequelize = models.Sequelize;
const sequelize = models.sequelize;
const Op = Sequelize.Op;
const logger = require("../loaders/logger");
// SERVICE
const Type = require("../services/type");

// // Retrieve all Type from the database.
exports.getAllType = async (req, res) => {
  try{
    const result = await Type.findAll();
    res.status(200).send(result);
  }catch (err) {
      logger.error("🔥 error: %o", err);
      throw new Error(err);
  }
}