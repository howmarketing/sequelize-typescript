"use strict";
import { Model } from "sequelize";
class Teste extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  public first_name!:string;
  public last_name!:string;
  public email!:string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static associate(models) {
    // define association here
  }
}

const ModelProps = {
  __modelInstance:undefined,
  /**
   * 
   * @param {typeof Teste} modelInstance 
   * @returns {typeof Teste}
   */
  _setModelInstance:(modelInstance)=>{
    ModelProps.__modelInstance = modelInstance;
    return modelInstance;
  },
  getModelClass:()=>{
    return Teste;
  },
  /**
   * 
   * @param {import('sequelize').Sequelize} sequelize 
   * @param {import('sequelize').DataTypes} DataTypes 
   * @returns {typeof Teste}
   */
  initModel:(sequelize, DataTypes) => {
    const instance = ModelProps.getModelClass()
    .init(
      {
        first_name: DataTypes.STRING,
        last_name: DataTypes.STRING,
        email: DataTypes.STRING,
      },
      {
        sequelize,
        modelName: "Teste",
      }
    );
    return ModelProps._setModelInstance(instance);
  }
};
export default ModelProps;
