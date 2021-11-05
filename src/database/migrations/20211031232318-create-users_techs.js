'use strict';
const { Sequelize, DataTypes, QueryInterface } = require('sequelize');

module.exports = {
  /**
   * 
   * @param {QueryInterface} queryInterface 
   * @param {DataTypes} SequelizeDataTypes 
   */
  up: async (queryInterface, SequelizeDataTypes) => {

    return await queryInterface.createTable('users_techs',
      {
        id: {
          type: SequelizeDataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        userId: {
          type: SequelizeDataTypes.INTEGER(11),
          allowNull: false,
          references: { model: 'users', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          field: 'user_id'
        },
        techId: {
          type: SequelizeDataTypes.INTEGER(11),
          allowNull: false,
          references: { model: 'techs', key: 'id' },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
          field: 'tech_id'
        },
        createdAt: {
          type: SequelizeDataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          field: 'created_at'
        },
        updatedAt: {
          type: SequelizeDataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
          onUpdate: Sequelize.literal('CURRENT_TIMESTAMP'),
          field: 'updated_at'
        }
      },
      {
        modelName: 'users_techs',
        underscored: true,
        charset: 'utf8mb4',
        engine: 'InnoDB',
        collate: 'utf8mb4_unicode_ci'
      }
    );
  },

  /**
   * 
   * @param {QueryInterface} queryInterface 
   * @param {DataTypes} SequelizeDataTypes 
   */
  down: async (queryInterface, SequelizeDataTypes) => {
    return await queryInterface.dropTable('users_techs');
  }
};
