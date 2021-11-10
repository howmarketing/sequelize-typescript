
"use strict";
import {Sequelize, Model} from "sequelize";
import {DataType} from "sequelize-typescript"
class SaleOrderAditionalInfo extends Model {
  
  public userId!:number;
  public saleOrderId!:number;
  public infoKey!:string;
  public infoSubject!:string;
  public infoMessage!:string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static associate(models:Record<any,any>) {
    const {User,SaleOrder} = models;
    console.log("ASSOCIATIONS FOR (SaleOrderAditionalInfo)")
    console.log("User: ",User, "SaleOrder: ",SaleOrder);
    
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
    
  }
}

const ModelProps = {
  __modelInstance:undefined,
  _setModelInstance:(modelInstance:typeof SaleOrderAditionalInfo)=>{
    ModelProps.__modelInstance = modelInstance;
    return modelInstance;
  },
  getModelClass:()=>{
    return SaleOrderAditionalInfo;
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
        infoKey: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "info_key",
        },
        infoSubject: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "info_subject",
        },
        infoMessage: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "info_message",
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
        name: { singular: "SaleOrderAditionalInfo", plural: "SalesOrderAditionalInfos" },
        modelName: "SaleOrderAditionalInfo",
        tableName: "sales_order_aditional_infos",
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
