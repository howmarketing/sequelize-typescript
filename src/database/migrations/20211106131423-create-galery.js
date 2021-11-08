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
      "galery",
      {
        id: {
          type: SequelizeDataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        bannerPresentationDesktop: {
          type: SequelizeDataTypes.TEXT,
          allowNull: false,
          field: "banner_presentation_desktop",
        },
        bannerPresentationMobile: {
          type: SequelizeDataTypes.TEXT,
          allowNull: false,
          field: "banner_presentation_mobile",
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
        modelName: "galery",
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
    return await queryInterface.dropTable("galery");
  },
};
