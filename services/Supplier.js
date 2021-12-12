const models = require("../models");
const Sequelize = models.Sequelize;
const sequelize = models.sequelize;
const Op = Sequelize.Op;

module.exports = class Supplier {
  // FIND ALL SUPPLIER
  static async findAll() {
    try {
      const results = await models.supplier.findAll();

      return (JSON.parse(JSON.stringify(results)));
    } catch (e) {
      throw new Error(e);
    }
  }
  // FIND SUPPLIER BY ID
  static async findById(id) {
    try {
      let result = await models.supplier.findByPk(id);

      if(result){
        result = result.toJSON();
        return result;
      }
      else return false;
    } catch (err) {
      throw new Error(err);
    }
  }
};