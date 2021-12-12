"use strict";
module.exports = (sequelize, Sequelize) => {
  const material = sequelize.define(
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
        allowNull: false,
      },
      updated_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          name: "unique_field",
          unique: true,
          fields: ["code"],
        },
        {
            name: "index_name",
            fields: ["name"],
        },
      ],
    }
  );

  material.associate = function (models) {
    material.belongsTo(models.type, { as: "type", constraints: false, foreignKey: "type_id", sourceKey: "id" });
    material.belongsTo(models.supplier, { as: "supplier", constraints: false, foreignKey: "supplier_id", sourceKey: "id" });
  };
  return material;
};
