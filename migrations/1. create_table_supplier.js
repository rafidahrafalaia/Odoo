"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface
      .createTable(
        "supplier",
        {
            id: {
              type: Sequelize.UUID,
              defaultValue: Sequelize.UUIDV1,
              primaryKey: true,
            },
            name: {
              type: Sequelize.STRING(150),
              allowNull: false,
            },
        },
        {
          engine: "InnoDB",
          charset: "utf8",
          collate: "utf8_general_ci",
        }
      )
      .then(() => {
      });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("supplier");
  },
};
