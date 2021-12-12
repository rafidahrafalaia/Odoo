"use strict";
module.exports = (sequelize, Sequelize) => {
  const type = sequelize.define(
    "type",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
    },
    {
      underscored: true,
      timestamps: false,
      freezeTableName: true,
    }
  );

  type.associate = function (models) {
    type.hasMany(models.material, { as: "material", constraints: false, foreignKey: "type_id" });
  };
  return type;
};
