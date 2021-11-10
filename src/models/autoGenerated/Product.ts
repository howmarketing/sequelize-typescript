"use strict";
import {Sequelize, Model} from "sequelize";
import {DataType} from "sequelize-typescript"
class Product extends Model {
 
  public productTitle!:string;
  public productDescription!:string;
  public productPrice!:number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static associate(models:Record<any,any>) {
    const {SaleOrderItem} = models;
    console.log("SaleOrderItem: ",SaleOrderItem);
    
    if(models?.SaleOrderItem){
      this.belongsTo(models.SaleOrderItem, {
        foreignKey: "product_id",
        as: "SaleOrderItem",
      });
    }
  }
}

const ModelProps = {
  __modelInstance:undefined,
  _setModelInstance:(modelInstance:typeof Product)=>{
    ModelProps.__modelInstance = modelInstance;
    return modelInstance;
  },
  getModelClass:()=>{
    return Product;
  },
 
  initModel:(sequelize:Sequelize, DataTypes:typeof DataType) => {
    const instance = ModelProps.getModelClass()
    .init(
      {
        productTitle: {
          type: DataTypes.STRING({ length: 255 }),
          allowNull: false,
          field: "title",
        },
        productDescription: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: "description",
        },
        productPrice: {
          type: DataTypes.DOUBLE({ length: 11, decimals: 8 }),
          allowNull: false,
          defaultValue: 0.0,
          field: "price",
        },
        createdAt: {
          type: DataTypes.DATE,
          field: "created_at",
        },
        updatedAt: {
          type: DataTypes.DATE,
          field: "updated_at",
          onUpdate: Sequelize.literal("CURRENT_TIMESTAMP").val + "",
        },
      },
      {
        sequelize,
        name: { singular: "Product", plural: "Products" },
        modelName: "Product",
        tableName: "products",
        underscored: true,
        charset: "utf8mb4",
        engine: "InnoDB",
        collate: "utf8mb4_unicode_ci",
      }
    );
    return ModelProps._setModelInstance(instance);
  }
};
export default ModelProps;
