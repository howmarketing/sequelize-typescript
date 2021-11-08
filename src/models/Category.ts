import { Model, DataTypes, Optional } from "sequelize";

import { connection as sequelize } from "@database/index";
import { User } from "@models/User";
interface Categoryttributes {
  id: number;
  title: string;
  description: string;
  bannerPresentationDesktop: string;
  bannerPresentationMobile: string;
  isEnabled: number;
  createdAt: Date;
  updatedAt: Date;
}

interface CategoryCreationAttributes
  extends Optional<Categoryttributes, "id"> {}

export class Category
  extends Model<Categoryttributes, CategoryCreationAttributes>
  implements Categoryttributes
{
  public id!: number;
  public title!: string;
  public description!: string;
  public bannerPresentationDesktop!: string;
  public bannerPresentationMobile!: string;
  public isEnabled!: number;

  public createdAt!: Date;
  public updatedAt!: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "title",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "description",
    },
    bannerPresentationDesktop: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "banner_presentation_desktop",
    },
    bannerPresentationMobile: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "banner_presentation_mobile",
    },
    isEnabled: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1,
      field: "is_enabled",
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
    tableName: "Categorys",
    modelName: "Category",
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    engine: "InnoDB",
  }
);

// Here we associate which actually populates out pre-declared `association` static and other methods.
Category.belongsToMany(User, {
  foreignKey: "Category_id",
  through: "categorys_categorys",
  as: "users",
});
