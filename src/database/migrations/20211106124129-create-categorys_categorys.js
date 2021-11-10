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
      "categorys_categorys",
      {
        id: {
          type: SequelizeDataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        categoryA: {
          type: SequelizeDataTypes.INTEGER,
          references: { model: "categorys", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          allowNull: false,
          field: "category_id_a",
        },
        categoryB: {
          type: SequelizeDataTypes.INTEGER,
          references: { model: "categorys", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          allowNull: false,
          field: "category_id_b",
        },
        bannerPresentationDesktop: {
          type: SequelizeDataTypes.TEXT,
          allowNull: true,
          field: "banner_presentation_desktop",
        },
        bannerPresentationMobile: {
          type: SequelizeDataTypes.TEXT,
          allowNull: true,
          field: "banner_presentation_mobile",
        },
        isEnabled: {
          type: SequelizeDataTypes.TINYINT,
          allowNull: false,
          defaultValue: 1,
          field: "is_enabled",
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
        moduleName: "categorys_categorys",
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
    return await queryInterface.dropTable("categorys_categorys");
  },
};
