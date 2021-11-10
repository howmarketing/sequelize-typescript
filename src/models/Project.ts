import { DataTypes, Optional, ModelDefined } from "sequelize";

import { connection } from "@database/index";
import { User } from "@models/User";
interface ProjectAttributes {
  id: number;
  userId: number;
  name: string;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> {}
export const Project: ModelDefined<
  ProjectAttributes,
  ProjectCreationAttributes
> = connection.define(
  "Project",
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
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    name: { singular: "Project", plural: "Projects" },
    modelName: "Project",
    tableName: "projects",
    underscored: true,
    charset: "utf8mb4",
    engine: "InnoDB",
    collate: "utf8mb4_unicode_ci",
  }
);
(async () => {
  await connection.sync({ force: false, alter: false });
  Project.belongsTo(User, {
    foreignKey: "user_id",
    as: "User",
  });
})();
