"use strict";
import {Sequelize, Model} from "sequelize";
import {DataType} from "sequelize-typescript"
class UserPhoneNumbers extends Model {
  
  public userId!:number;
  public phoneCountryCode!:number;
  public phoneStateAreaCode!:number;
  public phoneNumber!:number;
  public phoneFormatedNumber!:string;


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
      as:"User",
    });
  }
  }
}

const ModelProps = {
  __modelInstance:undefined,
  _setModelInstance:(modelInstance:typeof UserPhoneNumbers)=>{
    ModelProps.__modelInstance = modelInstance;
    return modelInstance;
  },
  getModelClass:()=>{
    return UserPhoneNumbers;
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
        phoneCountryCode: {
          type: DataTypes.INTEGER({ length: 3 }),
          allowNull: false,
          defaultValue: 55,
          field: "phone_country_code",
          comment: "Code to identify the phone number country prefix code.",
        },
        phoneStateAreaCode: {
          type: DataTypes.INTEGER({ length: 3 }),
          allowNull: false,
          defaultValue: "62",
          field: "phone_state_area_code",
          comment: "Code to identify the phone number state area prefix code.",
        },
        phoneNumber: {
          type: DataTypes.INTEGER({ length: 3 }),
          allowNull: false,
          defaultValue: 999999999,
          field: "phone_number",
          comment: "The phone number.",
        },
        phoneFormatedNumber: {
          type: DataTypes.STRING({ length: 23 }),
          allowNull: false,
          field: "phone_formated_number",
          comment: "Phone formated with concated phone number infos",
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
        name: { singular: "UserPhoneNumbers", plural: "UsersPhoneNumbers" },
        modelName: "UserPhoneNumbers",
        tableName: "users_phone_numbers",
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
