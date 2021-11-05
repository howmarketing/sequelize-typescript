import { Model, DataTypes, Optional } from "sequelize";

import { connection as sequelize } from "@database/index";
import { User } from "@models/User";
interface TechAttributes {
  id: number;
  title: string;
}

interface TechCreationAttributes extends Optional<TechAttributes, "id"> {}

export class Tech
  extends Model<TechAttributes, TechCreationAttributes>
  implements TechAttributes
{
  public id!: number;
  public title!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Tech.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "techs",
  }
);

// Here we associate which actually populates out pre-declared `association` static and other methods.
Tech.belongsToMany(User, {
  foreignKey: "tech_id",
  through: "users_techs",
  as: "users",
});
