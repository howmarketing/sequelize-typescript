"use strict";
const { Sequelize } = require("sequelize");
module.exports = {
  /**
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} SequelizeDataTypes
   * @returns {Promise<void>}
   */
  up: async (queryInterface, SequelizeDataTypes) => {
    return await queryInterface.createTable(
      "product_galery_items",
      {
        id: {
          type: SequelizeDataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        productId: {
          type: SequelizeDataTypes.INTEGER,
          allowNull: false,
          references: { model: "products", key: "id" },
          field: "product_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        galeryId: {
          type: SequelizeDataTypes.INTEGER,
          allowNull: false,
          references: { model: "galery", key: "id" },
          field: "galery_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
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
        modelName: "product_galery_items",
        underscored: true,
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
   * @returns {Promise<void>}
   */
  down: async (queryInterface, SequelizeDataTypes) => {
    return await queryInterface.dropTable("product_galery_items");
  },
};
