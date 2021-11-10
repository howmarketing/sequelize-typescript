"use strict";
import {Sequelize, Model} from "sequelize";
import {DataType} from "sequelize-typescript"
class Category extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  public title!:string;
  public description!:string;
  public bannerPresentationDesktop!:string;
  public bannerPresentationMobile!:string;
  public isEnabled!:boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static associate(models) {
    console.log("Category: ",models?.Category);
    
    if(models?.Category){
      this.belongsToMany(models.Category, {
        foreignKey: "Category_id",
        through: "categorys_categorys",
        as: "Categorys",
      });
  }
  }
}

const ModelProps = {
  __modelInstance:undefined,
  _setModelInstance:(modelInstance:typeof Category)=>{
    ModelProps.__modelInstance = modelInstance;
    return modelInstance;
  },
  getModelClass:()=>{
    return Category;
  },
 
  initModel:(sequelize:Sequelize, DataTypes:typeof DataType) => {
    const instance = ModelProps.getModelClass()
    .init(
      {
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
      },
      {
        sequelize,
        modelName: "Category",
        name: { singular: "Category", plural: "Categorys" },
        tableName: "categorys",
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        engine: "InnoDB",
      }
    );
    return ModelProps._setModelInstance(instance);
  }
};
export default ModelProps;
