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
      "categorys",
      {
        id: {
          type: SequelizeDataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        title: {
          type: SequelizeDataTypes.STRING,
          allowNull: false,
          field: "title",
        },
        description: {
          type: SequelizeDataTypes.TEXT,
          allowNull: false,
          field: "description",
          collate: "utf8mb4_unicode_ci",
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
        moduleName: "categorys",
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
    return await queryInterface.dropTable("categorys");
  },
};
