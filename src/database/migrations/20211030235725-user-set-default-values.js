'use strict';
const {QueryInterface,DataTypes} = require('sequelize');
module.exports = {
  /**
   * 
   * @param {QueryInterface} queryInterface 
   * @param {DataTypes} Sequelize 
   */
  up: async (queryInterface, Sequelize) => {
     await queryInterface.changeColumn('users', 'name', 
     {
      type:Sequelize.STRING,
      defaultValue:null,
      allowNull:true
     }
     );
     await queryInterface.changeColumn('users', 'email', 
     {
      type:Sequelize.STRING,
      defaultValue:null,
      allowNull:true
     }
     );
  },

  /**
   * 
   * @param {QueryInterface} queryInterface 
   * @param {DataTypes} Sequelize 
   */
  down: async (queryInterface, Sequelize) => {
    return;
  }
};
