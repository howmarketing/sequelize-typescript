import { DataTypes, Optional, ModelDefined } from "sequelize";

import { connection } from "@database/index";
import { User } from "@models/User";
export interface TechAttributes {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TechCreationAttributes
  extends Optional<TechAttributes, "id"> {}

export const Tech: ModelDefined<TechAttributes, TechCreationAttributes> =
  connection.define(
    "Tech",
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
      name: { singular: "Tech", plural: "Techs" },
      tableName: "techs",
      modelName: "Tech",
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      engine: "InnoDB",
    }
  );

(async () => {
  await connection.sync({ force: false, alter: false });
  // Here we associate which actually populates out pre-declared `association` static and other methods.
  Tech.belongsToMany(User, {
    foreignKey: "tech_id",
    through: "users_techs",
    as: "Users",
  });
})();
