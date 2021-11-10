import { DataTypes, Optional, ModelDefined } from "sequelize";

import { connection } from "@database/index";
import { User } from "@models/User";
interface AddressAttributes {
  id: number;
  userId: number;
  name: string;
}

interface AddressCreationAttributes extends Optional<AddressAttributes, "id"> {}

export const Address: ModelDefined<
  AddressAttributes,
  AddressCreationAttributes
> = connection.define(
  "Address",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      field: "user_id",
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    name: { singular: "Address", plural: "Addresses" },
    modelName: "Address",
    tableName: "address",
    underscored: true,
    charset: "utf8mb4",
    engine: "InnoDB",
    collate: "utf8mb4_unicode_ci",
  }
);

// Here we associate which actually populates out pre-declared `association` static and other methods.
(async () => {
  await connection.sync({ force: false, alter: false });
  Address.belongsTo(User, { foreignKey: "user_id", as: "User" });
})();
