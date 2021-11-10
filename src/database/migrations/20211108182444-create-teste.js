"use strict";
const { Sequelize } = require("sequelize");
module.exports = {
  /**
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} SequelizeDataTypes
   * @returns {Promise<void>}
   */
  up: async (queryInterface, SequelizeDataTypes) => {
    return await queryInterface.createTable("teste", {
      id: {
        type: SequelizeDataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      firstName: {
        type: SequelizeDataTypes.STRING,
        allowNull: true,
        field: "first_name",
      },
      lastName: {
        type: SequelizeDataTypes.STRING,
        allowNull: true,
        field: "last_name",
      },
      email: {
        type: SequelizeDataTypes.STRING({ length: 128 }),
        field: "email",
        allowNull: true,
        defaultValue: " - ",
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
        onUpdate: Sequelize.literal("CURRENT_TIMESTAMP").val + "",
        field: "updated_at",
      },
    });
  },

  /**
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} SequelizeDataTypes
   * @returns {Promise<void>}
   */
  down: async (queryInterface, SequelizeDataTypes) => {
    return await queryInterface.dropTable("teste");
  },
};
