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
      "sales_order",
      {
        id: {
          type: SequelizeDataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          type: SequelizeDataTypes.INTEGER,
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "user_id",
        },
        addressFullText: {
          type: SequelizeDataTypes.TEXT,
          allowNull: false,
          field: "address_full_text",
        },
        paymentGetwayIdentifyer: {
          type: SequelizeDataTypes.STRING,
          allowNull: false,
          field: "payment_getway_identifyer",
        },
        paymentTransactionId: {
          type: SequelizeDataTypes.TEXT,
          allowNull: false,
          field: "payment_transaction_id",
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
        moduleName: "sales_order",
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
    await queryInterface.dropTable("sales_order");
  },
};
