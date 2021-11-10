"use strict";
import {Sequelize, Model} from "sequelize";
import {DataType} from "sequelize-typescript"
class User extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  public firstName!:string;
  public lastName!:string;
  public email!:string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static associate(models) {
    const {Tech, Project, UserPhoneNumbers, Address, SaleOrder} = models;
    console.log("Tech: ",Tech, "Project: ",Project, "UserPhoneNumbers: ",UserPhoneNumbers, "Address: ",Address, "SaleOrder: ",SaleOrder);
    if(models?.Tech){
    this.belongsToMany(models?.Tech, {
      foreignKey: "user_id",
      through: "users_techs",
      as: "techs",
    });
  }
  
  if(models?.Project){
    // ASSOCIATION BETWEEN 1/N TO USER AND PROJECTS
    this.hasMany(models.Project, { 
      foreignKey: "user_id", 
      as: {singular:"Project", plural:"Projects"},
    });
  }
  if(models?.UserPhoneNumbers){
    // ASSOCIATION BETWEEN 1/N TO USER AND PHONE NUMBERS
    this.hasMany(models.UserPhoneNumbers, {
      foreignKey: "user_id",
      as: {singular:"UserPhoneNumbers", plural:"UsersPhoneNumbers"},
    });
  }
  if(models?.Address){
    // ASSOCIATION BETWEEN 1/N TO USER AND ADDRESSES
    this.hasMany(models.Address, { foreignKey: "user_id", 
    as: {singular:"Address", plural:"Addresses"},
  });
  }
  if(models?.SaleOrder){
    // ASSOCIATION BETWEEN 1/N TO USER AND ORDERS
    this.hasMany(models.SaleOrder, {
      foreignKey: "user_id",
      as: {singular:"SaleOrder", plural:"SalesOrder"},
    });
  }
  }
}

const ModelProps = {
  __modelInstance:undefined,
  _setModelInstance:(modelInstance:typeof User)=>{
    ModelProps.__modelInstance = modelInstance;
    return modelInstance;
  },
  getModelClass:()=>{
    return User;
  },
 
  initModel:(sequelize:Sequelize, DataTypes:typeof DataType) => {
    const instance = ModelProps.getModelClass()
    .init(
      {
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "first_name",
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false,
          field: "last_name",
        },
        email: DataTypes.STRING,
      },
      {
        sequelize,
        name: { singular: "User", plural: "Users" },
        modelName: "User",
        tableName: "users",
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
