"use strict";
const Sequelize = require("sequelize");
module.exports = {
  /**
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} SequelizeDataTypes
   * @returns {Promise<void>}
   */
  up: async (queryInterface, SequelizeDataTypes) => {
    return await queryInterface.createTable(
      "products_categorys",
      {
        id: {
          type: SequelizeDataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        productId: {
          type: SequelizeDataTypes.INTEGER,
          references: { model: "products", key: "id" },
          allowNull: false,
          field: "product_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        categoryId: {
          type: SequelizeDataTypes.INTEGER,
          references: { model: "categorys", key: "id" },
          allowNull: false,
          field: "category_id",
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
        modelName: "products_categorys",
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
    return await queryInterface.dropTable("products_categorys");
  },
};
