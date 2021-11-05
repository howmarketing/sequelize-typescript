"use strict";
const { Model, DataTypes, Sequelize, ModelCtor } = require("sequelize");

class UsersPhoneNumbers extends Model {
  /**
   *
   * @param {Sequelize} sequelize
   */
  static init(sequelize) {
    super.init(
      {
        userId: {
          type: DataTypes.INTEGER,
          field: "user_id",
          references: { model: "users", key: "id" },
        },
        phoneCountryCode: {
          type: DataTypes.INTEGER,
          field: "phone_country_code",
        },
        phoneStateAreaCode: {
          type: DataTypes.INTEGER,
          field: "phone_state_area_code",
        },
        phoneNumber: {
          type: DataTypes.INTEGER,
          field: "phone_number",
        },
        phoneFormatedNumber: {
          type: DataTypes.INTEGER,
          field: "phone_formated_number",
        },
        createdAt: {
          type: DataTypes.DATE,
          field: "created_at",
        },
        updatedAt: {
          type: DataTypes.DATE,
          field: "updated_at",
        },
      },
      {
        sequelize,
        modelName: "users_phone_numbers",
        underscored: true,
        charset: "utf8mb4",
        engine: "InnoDB",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }

  /**
   *
   * @param {{[key: string]: ModelCtor<Model<any, any>>;}} models
   */
  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}

module.exports = UsersPhoneNumbers;
