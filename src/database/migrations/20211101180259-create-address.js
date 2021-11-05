"use strict";
// eslint-disable-next-line no-unused-vars
const { Sequelize, DataTypes, QueryInterface } = require("sequelize");
module.exports = {
  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} SequelizeDataTypes
   */
  up: async (queryInterface, SequelizeDataTypes) => {
    return await queryInterface.createTable(
      "address",
      {
        id: {
          type: SequelizeDataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          type: SequelizeDataTypes.INTEGER({ length: 11 }).UNSIGNED,
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "user_id",
        },
        addressDescription: {
          type: SequelizeDataTypes.STRING(128),
          allowNull: false,
          defaultValue: null,
          field: "description",
          comment: "Description of user address",
        },
        addressNumber: {
          type: SequelizeDataTypes.STRING(8),
          allowNull: true,
          defaultValue: "S/N",
          field: "number",
          comment: "The number of user address.",
        },
        addressNeighborhood: {
          type: SequelizeDataTypes.STRING({ length: 64 }),
          allowNull: false,
          defaultValue: null,
          field: "neighborhood",
          comment: "The user address neighborhood info.",
        },
        addressPlusInfo: {
          type: SequelizeDataTypes.STRING({ length: 128 }),
          allowNull: true,
          defaultValue: "",
          field: "plus_info",
          comment: "The user address plus info.",
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
        charset: "utf8mb4",
        engine: "InnoDB",
        collate: "utf8mb4_unicode_ci",
      }
    );
  },

  /**
   *
   * @param {QueryInterface} queryInterface
   * @param {DataTypes} SequelizeDataTypes
   */
  down: async (queryInterface, SequelizeDataTypes) => {
    return await queryInterface.dropTable("address");
  },
};
