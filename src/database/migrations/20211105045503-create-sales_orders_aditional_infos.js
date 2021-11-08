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
      "sales_order_aditional_infos",
      {
        id: {
          type: SequelizeDataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          type: SequelizeDataTypes.INTEGER({ length: 11 }),
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          field: "user_id",
        },
        saleOrderId: {
          type: SequelizeDataTypes.INTEGER({ length: 11 }),
          allowNull: false,
          references: { model: "sales_order", key: "id" },
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          field: "sale_order_id",
        },
        infoKey: {
          type: SequelizeDataTypes.STRING,
          allowNull: false,
          field: "info_key",
        },
        infoSubject: {
          type: SequelizeDataTypes.STRING,
          allowNull: false,
          field: "info_subject",
        },
        infoMessage: {
          type: SequelizeDataTypes.STRING,
          allowNull: false,
          field: "info_message",
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
        moduleName: "sales_order_aditional_infos",
        charset: "utf8mb4",
        engine: "InnoDB",
        collate: "utf8mb4_unicode_ci",
      }
    );
  },

  /**
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} SequelizeDataTypes
   */
  down: async (queryInterface, SequelizeDataTypes) => {
    return await queryInterface.dropTable("sales_order_aditional_infos");
  },
};
