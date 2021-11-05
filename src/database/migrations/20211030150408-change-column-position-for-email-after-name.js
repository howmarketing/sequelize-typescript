"use strict";
const { DataTypes, QueryInterface } = require("sequelize");

module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} Sequelize
   */
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.changeColumn("users", "email", {
      type: Sequelize.STRING,
      after: "name",
    });
  },

  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} Sequelize
   */
  down: async (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  },
};
