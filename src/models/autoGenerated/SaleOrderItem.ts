"use strict";
import {Sequelize, Model} from "sequelize";
import {DataType} from "sequelize-typescript"
class SaleOrderItem extends Model {
  
  public userId!:number;
  public saleOrderId!:number;
  public productId!:number;
  public productTitleAtTime!:string;
  public productPriceAtTime!:number;
  public productDiscountValueAppliedAtTime!:number;
  public productDiscountLabelAtTime!:string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static associate(models:Record<any,any>) {
    const {User,SaleOrder,Product} = models;
    console.log("ASSOCIATIONS FOR (SaleOrderItem)")
    console.log("User: ",User, "SaleOrder: ",SaleOrder,"Product: ",Product);
    
    if(models?.User){
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "User",
      });
    }
    if(models?.SaleOrder){
      this.belongsTo(models.SaleOrder, {
        foreignKey: "sale_order_id",
        as: "SaleOrder",
      });
    }
    if(models?.Product){
      this.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "Product",
      });
    }
  }
}

const ModelProps = {
  __modelInstance:undefined,
  _setModelInstance:(modelInstance:typeof SaleOrderItem)=>{
    ModelProps.__modelInstance = modelInstance;
    return modelInstance;
  },
  getModelClass:()=>{
    return SaleOrderItem;
  },
 
  initModel:(sequelize:Sequelize, DataTypes:typeof DataType) => {
    const instance = ModelProps.getModelClass()
    .init(
      {
        userId: {
          type: DataTypes.INTEGER({ length: 11 }),
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          field: "user_id",
        },
        saleOrderId: {
          type: DataTypes.INTEGER({ length: 11 }),
          allowNull: false,
          references: { model: "sales_order", key: "id" },
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          field: "sale_order_id",
        },
        productId: {
          type: DataTypes.INTEGER({ length: 11 }),
          allowNull: false,
          references: { model: "products", key: "id" },
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          field: "product_id",
        },
        productTitleAtTime:{
          type:DataTypes.STRING,
          allowNull:true,
          defaultValue:"Product title was not setted.",
          field:"product_title_at_time"
        },
        productPriceAtTime:{
          type:DataTypes.DOUBLE({length:11,decimals:8}),
          allowNull:true,
          defaultValue:0.000,
          field:"product_price_at_time"
        },
        productDiscountValueAppliedAtTime:{
          type:DataTypes.DOUBLE({length:11,decimals:8}),
          allowNull:true,
          defaultValue:0.000,
          field:"product_discount_value_applied_at_time"
        },
        productDiscountLabelAtTime:{
          type:DataTypes.STRING,
          allowNull:true,
          defaultValue:'',
          field:"product_discount_label_at_time"
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          field: "created_at",
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          onUpdate: Sequelize.literal("CURRENT_TIMESTAMP").val + "",
          field: "updated_at",
        },
      },
      {
        sequelize,
        name: { singular: "SaleOrderItem", plural: "SaleOrderItems" },
        modelName: "SaleOrderItem",
        tableName: "sales_order_items",
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
