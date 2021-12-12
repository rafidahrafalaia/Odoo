"use strict";
module.exports = (sequelize, Sequelize) => {
  const supplier = sequelize.define(
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
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    }
  );

  supplier.associate = function (models) {
    supplier.hasMany(models.material, { as: "material", constraints: false, foreignKey: "supplier_id" });
  };
  return supplier;
};
