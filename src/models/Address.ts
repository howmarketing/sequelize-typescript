import { Model, DataTypes, Optional } from "sequelize";

import { connection as sequelize } from "@database/index";
import { User } from "@models/User";
interface AddressAttributes {
  id: number;
  userId: number;
  name: string;
}

interface AddressCreationAttributes extends Optional<AddressAttributes, "id"> {}

export class Address
  extends Model<AddressAttributes, AddressCreationAttributes>
  implements AddressAttributes
{
  public id!: number;
  public userId!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Address.init(
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
    sequelize,
    modelName: "address",
    tableName: "addresss",
    underscored: true,
    charset: "utf8mb4",
    engine: "InnoDB",
    collate: "utf8mb4_unicode_ci",
  }
);

// Here we associate which actually populates out pre-declared `association` static and other methods.
Address.belongsTo(User, { foreignKey: "user_id", as: "user" });
