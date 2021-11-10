"use strict";
import {Sequelize, Model} from "sequelize";
import {DataType} from "sequelize-typescript"
class Address extends Model {
  
  public userId!:number;
  public city!:string;
  public state!:string;
  public addressDescription!:string;
  public addressNumber!:string;
  public addressNeighborhood!:string;
  public addressPlusInfo!:string;
  public adressActived!:boolean;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static associate(models:Record<any,any>) {
    const {User} = models;
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
  _setModelInstance:(modelInstance:typeof Address)=>{
    ModelProps.__modelInstance = modelInstance;
    return modelInstance;
  },
  getModelClass:()=>{
    return Address;
  },
 
  initModel:(sequelize:Sequelize, DataTypes:typeof DataType) => {
    const instance = ModelProps.getModelClass()
    .init(
      {
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
          field: "user_id",
        },
        city: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "city",
          comment: "City name",
        },
        state: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "state",
          comment: "State name",
        },
        addressDescription: {
          type: DataTypes.STRING(128),
          allowNull: false,
          field: "description",
          comment: "Description of user address",
        },
        addressNumber: {
          type: DataTypes.STRING(8),
          allowNull: true,
          defaultValue: "S/N",
          field: "number",
          comment: "The number of user address.",
        },
        addressNeighborhood: {
          type: DataTypes.STRING({ length: 64 }),
          allowNull: false,
          field: "neighborhood",
          comment: "The user address neighborhood info.",
        },
        addressPlusInfo: {
          type: DataTypes.STRING({ length: 128 }),
          allowNull: true,
          field: "plus_info",
          comment: "The user address plus info.",
        },
        adressActived: {
          type: DataTypes.TINYINT,
          allowNull: false,
          defaultValue: 0,
          field: "actived_address",
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
        name: { singular: "Address", plural: "Addresses" },
        modelName: "Address",
        tableName: "address",
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
