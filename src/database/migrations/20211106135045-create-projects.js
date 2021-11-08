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
      "projects",
      {
        id: {
          type: SequelizeDataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        userId: {
          type: SequelizeDataTypes.INTEGER,
          allowNull: false,
          references: { model: "users", key: "id" },
          field: "user_id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
        projectName: {
          type: SequelizeDataTypes.STRING({ length: 96 }),
          allowNull: false,
          defaultValue: "Project name",
          field: "name",
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
        modelName: "projects",
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
    return await queryInterface.dropTable("projects");
  },
};
