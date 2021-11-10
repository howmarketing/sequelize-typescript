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
      "products",
      {
        id: {
          type: SequelizeDataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        productTitle: {
          type: SequelizeDataTypes.STRING({ length: 255 }),
          allowNull: false,
          field: "title",
        },
        productDescription: {
          type: SequelizeDataTypes.TEXT,
          allowNull: false,
          field: "description",
          collate: "utf8mb4_unicode_ci",
        },
        productPrice: {
          type: SequelizeDataTypes.DOUBLE({ length: 11, decimals: 8 }),
          allowNull: false,
          defaultValue: 0.0,
          field: "price",
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
        moduleName: "products",
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
    await queryInterface.dropTable("products");
  },
};
