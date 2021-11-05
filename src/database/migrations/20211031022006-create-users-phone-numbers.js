'use strict';
const { Sequelize, DataTypes, QueryInterface } = require('sequelize');

module.exports = {
  /**
   * 
   * @param {QueryInterface} queryInterface 
   * @param {DataTypes} SequelizeDataTypes 
   */
  up: async (queryInterface, SequelizeDataTypes) => {

    return await queryInterface.createTable('users_phone_numbers',
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
        phoneCountryCode: {
          type: SequelizeDataTypes.INTEGER(3),
          allowNull: false,
          defaultValue: 55,
          field: 'phone_country_code',
          comment: 'Code to identify the phone number country prefix code.'
        },
        phoneStateAreaCode: {
          type: SequelizeDataTypes.INTEGER(3),
          allowNull: false,
          defaultValue: '62',
          field: 'phone_state_area_code',
          comment: 'Code to identify the phone number state area prefix code.'
        },
        phoneNumber: {
          type: SequelizeDataTypes.INTEGER(9),
          allowNull: false,
          defaultValue: 999999999,
          field: 'phone_number',
          comment: 'The phone number.'
        },
        phoneFormatedNumber: {
          type: DataTypes.STRING(23),
          allowNull: false,
          field: 'phone_formated_number',
          comment: 'Phone formated with concated phone number infos',
          collate: 'utf8mb4_unicode_ci'
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
        modelName: 'users_phone_numbers',
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
    return await queryInterface.dropTable('users_phone_numbers');
  }
};
