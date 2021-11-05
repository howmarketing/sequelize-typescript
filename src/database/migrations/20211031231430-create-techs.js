"use strict";
const { Sequelize, DataTypes, QueryInterface } = require("sequelize");

module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} SequelizeDataTypes
   */
  up: async (queryInterface, SequelizeDataTypes) => {
    return await queryInterface.createTable(
      "techs",
      {
        id: {
          type: SequelizeDataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: {
          type: SequelizeDataTypes.STRING(255),
          allowNull: false,
          field: "name",
        },
        createdAt: {
          type: SequelizeDataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          field: "created_at",
        },
        updatedAt: {
          type: SequelizeDataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          onUpdate: Sequelize.literal("CURRENT_TIMESTAMP"),
          field: "updated_at",
        },
      },
      {
        modelName: "techs",
        underscored: true,
        charset: "utf8mb4",
        engine: "InnoDB",
        collate: "utf8mb4_unicode_ci",
      }
    );
  },

  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} SequelizeDataTypes
   */
  down: async (queryInterface, SequelizeDataTypes) => {
    return await queryInterface.dropTable("techs");
  },
};
