import Sequelize, { ModelDefined, DataTypes, Optional } from "sequelize";

import { connection, connection as sequelize } from "@database/index";
import { User } from "@models/User";
interface UserPhoneNumbersAttributes {
  id: number;
  userId: number;
  phoneCountryCode: number;
  phoneStateAreaCode: number;
  phoneNumber: number;
  phoneFormatedNumber: string;
  createdAt: Date;
  updatedAt: Date;
}

interface UserPhoneNumbersCreationAttributes
  extends Optional<UserPhoneNumbersAttributes, "id"> {}

export const UserPhoneNumbers: ModelDefined<
  UserPhoneNumbersAttributes,
  UserPhoneNumbersCreationAttributes
> = sequelize.define(
  "UserPhoneNumbers",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
    phoneCountryCode: {
      type: DataTypes.INTEGER({ length: 3 }),
      allowNull: false,
      defaultValue: 55,
      field: "phone_country_code",
      comment: "Code to identify the phone number country prefix code.",
    },
    phoneStateAreaCode: {
      type: DataTypes.INTEGER({ length: 3 }),
      allowNull: false,
      defaultValue: "62",
      field: "phone_state_area_code",
      comment: "Code to identify the phone number state area prefix code.",
    },
    phoneNumber: {
      type: DataTypes.INTEGER({ length: 3 }),
      allowNull: false,
      defaultValue: 999999999,
      field: "phone_number",
      comment: "The phone number.",
    },
    phoneFormatedNumber: {
      type: DataTypes.STRING({ length: 23 }),
      allowNull: false,
      field: "phone_formated_number",
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "updated_at",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      onUpdate: Sequelize.literal("CURRENT_TIMESTAMP").val + "",
    },
  },
  {
    name: { singular: "UserPhoneNumbers", plural: "UsersPhoneNumbers" },
    modelName: "UserPhoneNumbers",
    tableName: "users_phone_numbers",
    underscored: true,
    charset: "utf8mb4",
    engine: "InnoDB",
    collate: "utf8mb4_unicode_ci",
  }
);

(async () => {
  await connection.sync({ force: false, alter: false });
  // Here we associate which actually populates out pre-declared `association` static and other methods.
  UserPhoneNumbers.belongsTo(User, { foreignKey: "user_id", as: "User" });
})();
