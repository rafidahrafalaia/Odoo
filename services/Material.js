const models = require("../models");
const Sequelize = models.Sequelize;
const sequelize = models.sequelize;
const Op = Sequelize.Op;

const config = require("../config");
// const { mysqlDate } = require("../utils");

module.exports = class Material {
  // FIND MATERIAL BY ID
  static async findById(id) {
    try {
      let result = await models.material.findByPk(id, {
        attributes: ["id", "code", "name", "buy_price"],
        include: [
          { model: models.type, as: "type", attributes: ["id", "name"], required: false },
          { model: models.supplier, as: "supplier", attributes: ["id", "name"], required: false },
        ],
      });

      if(result){
        result = result.toJSON();
        return result;
      }
      else return false;
    } catch (err) {
      throw new Error(err);
    }
  }

  // FIND ALL MATERIAL
  static async findAll( page, search, type ) {
    let query, queryType;

    queryType = { ...queryType, };
    query = { ...query, };
    query = { ...query, offset: (page - 1) * config.display.limits, limit: 1 * config.display.limits };

    if (search != null) {
      query = { ...query, where: { name: { [Op.substring]: search } } };
    }

    if (type) {
      queryType = { ...queryType, name: type };
    }

    query = { ...query,  
      attributes: ["id", "code", "name", "buy_price"],
      include: [
        { model: models.type, as: "type", attributes: ["id", "name"], where: queryType },
        { model: models.supplier, as: "supplier", attributes: ["id", "name"], required: false },
      ], 
    };

    try {
      const results = await models.material.findAll(query);

      return (JSON.parse(JSON.stringify(results)));
    } catch (e) {
      throw new Error(e);
    }
  }

  // CREATE MATERIAL
  static async create(values) {
    let transaction, clauses;

    transaction = await sequelize.transaction();
    clauses = { ...clauses, transaction };

    try {
      const created = await models.material.create(values, clauses);
      await transaction.commit();

      const result = await Material.findById(created.id);

      return result;
    } catch (e) {
      await transaction.rollback();
      throw new Error("Failed to create material record, check submited value [DB Error]");
    }
  }

  // UPDATE MATERIAL
  static async updateById(id, values) {
    let transaction;

    transaction = await sequelize.transaction();

    try {
      // UPDATE ROLE
      await models.material.update(values, { where: { id }, transaction });

      await transaction.commit();

      const result = await Material.findById(id);
      return result;
    } catch (err) {
      await transaction.rollback();

      throw new Error("Failed to update Material record, check submited value [DB Error]");
    }
  }

  // DELETE 
  static async deleteById(id) {
    try {
      await models.material.destroy({ where: { id }, force: true });

      return true;;
    } catch (err) {
      throw new Error(err);
    }
  }
};
