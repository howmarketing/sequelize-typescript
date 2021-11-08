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
      "address",
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
        city: {
          type: SequelizeDataTypes.STRING,
          allowNull: false,
          field: "city",
          comment: "City name",
        },
        state: {
          type: SequelizeDataTypes.STRING,
          allowNull: false,
          field: "state",
          comment: "State name",
        },
        addressDescription: {
          type: SequelizeDataTypes.STRING(128),
          allowNull: false,
          field: "description",
          comment: "Description of user address",
          collate: "utf8mb4_unicode_ci",
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
          field: "neighborhood",
          comment: "The user address neighborhood info.",
        },
        addressPlusInfo: {
          type: SequelizeDataTypes.STRING({ length: 128 }),
          allowNull: true,
          field: "plus_info",
          comment: "The user address plus info.",
        },
        adressActived: {
          type: SequelizeDataTypes.TINYINT,
          allowNull: false,
          defaultValue: 0,
          field: "actived_address",
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
        moduleName: "address",
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
    return await queryInterface.dropTable("address");
  },
};
