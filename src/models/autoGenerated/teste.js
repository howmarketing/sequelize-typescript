"use strict";
const { Model } = require("sequelize");
class Teste extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
  }
}
const ModuleExports = {
  __modelInstance:undefined,
  /**
   * 
   * @param {typeof Teste} modelInstance 
   * @returns {typeof Teste}
   */
  _setModelInstance:(modelInstance)=>{
    ModuleExports.__modelInstance = modelInstance;
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
    const instance = ModuleExports.getModelClass()
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
    return ModuleExports._setModelInstance(instance);
  }
};
module.exports = ModuleExports;
