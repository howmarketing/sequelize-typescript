"use strict";
import {Sequelize, Model} from "sequelize";
import {DataType} from "sequelize-typescript"
class SaleOrder extends Model {
  
  public userId!:number;
  public addressFullText!:string;
  public paymentGetwayIdentifyer!:string;
  public paymentTransactionId!:string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static associate(models:Record<any,any>) {
    const {User} = models;
    console.log("ASSOCIATIONS FOR (SaleOrder)")
    console.log("User: ",User);
    
    if(models?.User){
      this.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "User",
      });
    }
    
  }
}

const ModelProps = {
  __modelInstance:undefined,
  _setModelInstance:(modelInstance:typeof SaleOrder)=>{
    ModelProps.__modelInstance = modelInstance;
    return modelInstance;
  },
  getModelClass:()=>{
    return SaleOrder;
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
        addressFullText: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: "address_full_text",
        },
        paymentGetwayIdentifyer: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "payment_getway_identifyer",
        },
        paymentTransactionId: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: "payment_transaction_id",
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
        name: { singular: "SaleOrder", plural: "SalesOrder" },
        modelName: "SaleOrder",
        tableName: "sales_order",
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
