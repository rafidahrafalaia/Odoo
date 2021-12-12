const models = require("../models");
const Sequelize = models.Sequelize;
const sequelize = models.sequelize;
const Op = Sequelize.Op;
const logger = require("../loaders/logger");
// SERVICE
const Supplier = require("../services/Supplier");

// // Retrieve all Supplier from the database.
exports.getAllSupplier = async (req, res) => {
  try{
    const result = await Supplier.findAll();
    res.status(200).send(result);
  }catch (err) {
      logger.error("🔥 error: %o", err);
      throw new Error(err);
  }
}