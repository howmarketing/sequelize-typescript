"use strict";
// const { Sequelize } = require("sequelize");
module.exports = {
  /**
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} SequelizeDataTypes
   */
  up: async (queryInterface, SequelizeDataTypes) => {
    await queryInterface.changeColumn("users", "first_name", {
      type: SequelizeDataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    });
    await queryInterface.changeColumn("users", "last_name", {
      type: SequelizeDataTypes.STRING,
      defaultValue: null,
      allowNull: true,
    });
    return await queryInterface.changeColumn("users", "email", {
      type: SequelizeDataTypes.STRING({ length: 128 }),
      defaultValue: null,
      unique: true,
      allowNull: true,
    });
  },

  /**
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} SequelizeDataTypes
   */
  down: async (queryInterface, SequelizeDataTypes) => {
    return await new Promise((resolve, reject) => {
      setTimeout((t) => {
        resolve({ success: true });
      });
    });
  },
};
