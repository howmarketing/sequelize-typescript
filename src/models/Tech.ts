import { Model, DataTypes, Optional } from "sequelize";

import { connection as sequelize } from "@database/index";
import { User } from "@models/User";
interface TechAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

interface TechCreationAttributes extends Optional<TechAttributes, "id"> {}

export class Tech
  extends Model<TechAttributes, TechCreationAttributes>
  implements TechAttributes
{
  public id!: number;
  public name!: string;

  public createdAt!: Date;
  public updatedAt!: Date;
}

Tech.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
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
    tableName: "techs",
    modelName: "tech",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    engine: "InnoDB",
  }
);

// Here we associate which actually populates out pre-declared `association` static and other methods.
Tech.belongsToMany(User, {
  foreignKey: "tech_id",
  through: "users_techs",
  as: "users",
});
