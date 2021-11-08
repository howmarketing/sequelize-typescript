import {
  Model,
  DataTypes,
  Optional,
  BelongsToGetAssociationMixin,
  BelongsToCreateAssociationMixin,
} from "sequelize";

import { connection as sequelize } from "@database/index";
import { User } from "@models/User";
interface ProjectAttributes {
  id: number;
  userId: number;
  name: string;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, "id"> {}

export class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  public id!: number;
  public userId!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getUser!: BelongsToGetAssociationMixin<User>;
  public addUserAssociate!: BelongsToCreateAssociationMixin<User>;
}

Project.init(
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
    sequelize,
    modelName: "project",
    tableName: "projects",
    underscored: true,
    charset: "utf8mb4",
    engine: "InnoDB",
    collate: "utf8mb4_unicode_ci",
  }
);

// Here we associate which actually populates out pre-declared `association` static and other methods.
Project.belongsTo(User, { foreignKey: "user_id", as: "user" });
