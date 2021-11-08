"use strict";
const { Sequelize } = require("sequelize");

module.exports = {
  /**
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} SequelizeDataTypes
   */
  up: async (queryInterface, SequelizeDataTypes) => {
    return await queryInterface.createTable(
      "trash_tables_records",
      {
        id: {
          type: SequelizeDataTypes.INTEGER({ length: 11 }).UNSIGNED,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        tableName: {
          type: SequelizeDataTypes.STRING({ length: 255 }),
          allowNull: false,
          field: "table_name",
          comment: "Refer to a database table name that has the trash status",
        },
        tableRecordId: {
          type: SequelizeDataTypes.INTEGER({ length: 11 }).UNSIGNED,
          allowNull: false,
          field: "table_record_id",
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
      },
      {
        engine: "InnoDB",
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        moduleName: "trash_tables_records",
      }
    );
  },

  /**
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} SequelizeDataTypes
   */
  down: async (queryInterface, Sequelize) => {
    return await queryInterface.dropTable("trash_tables_records");
  },
};
