const models = require("../models");
const Sequelize = models.Sequelize;
const sequelize = models.sequelize;
const Op = Sequelize.Op;

module.exports = class Type {
  // FIND ALL Type
  static async findAll() {
    try {
      const results = await models.type.findAll();

      return (JSON.parse(JSON.stringify(results)));
    } catch (e) {
      throw new Error(e);
    }
  }
  // FIND TYPE BY ID
  static async findById(id) {
    try {
      let result = await models.type.findByPk(id);

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
