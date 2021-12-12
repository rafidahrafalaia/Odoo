"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable(
        "material",
        {
            id: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV1,
              primaryKey: true,
            },
            code: {
              type: Sequelize.STRING(150),
              allowNull: false,
            },
            name: {
              type: Sequelize.STRING(150),
              allowNull: false,
            },
            type_id: {
              type: Sequelize.UUID,
              allowNull: false,
              references: {
                model: "type",
                key: "id",
              },
            },
            buy_price: {
              type: Sequelize.INTEGER,
              allowNull: false,
            },
            supplier_id: {
              type: Sequelize.UUID,
              allowNull: false,
              references: {
                model: "supplier",
                key: "id",
              },
            },
            created_date: {
              type: Sequelize.DATE,
              allowNull: false
            },
            updated_date: {
              type: Sequelize.DATE,
            },
        },
        {
          engine: "InnoDB",
          charset: "utf8",
          collate: "utf8_general_ci",
        }
      )
      .then(() => {
        queryInterface.addIndex("material", ["code"], {
          name: "unique_field",
          type: "UNIQUE",
        });
        queryInterface.addIndex("material", ["name"], {
          name: "index_name",
        });
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("material");
  },
};
