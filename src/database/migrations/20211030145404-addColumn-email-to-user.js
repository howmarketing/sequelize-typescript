'use strict';
const { DataTypes, QueryInterface } = require('sequelize');
module.exports = {
  /**
   * @param {QueryInterface} queryInterface 
   * @param {DataTypes} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
    return await queryInterface.addColumn(
      'users',
      'email',
      {
        type: Sequelize.STRING,
        allowNull:true
      }
    );
  },

  /**
   * @param {QueryInterface} queryInterface 
   * @param {DataTypes} Sequelize 
   */
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.removeColumn('users', 'email');
  }
};
