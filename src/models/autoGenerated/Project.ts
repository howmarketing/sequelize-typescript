"use strict";
import {Sequelize, Model} from "sequelize";
import {DataType} from "sequelize-typescript"
class Project extends Model {
  
  public userId!:number;
  public projectName!:string;


  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  static associate(models:Record<any,any>) {
    const {User} = models;
    console.log("ASSOCIATIONS FOR (Project)")
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
  _setModelInstance:(modelInstance:typeof Project)=>{
    ModelProps.__modelInstance = modelInstance;
    return modelInstance;
  },
  getModelClass:()=>{
    return Project;
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
        projectName: {
          type: DataTypes.STRING({ length: 96 }),
          allowNull: false,
          defaultValue: "Project name",
          field: "name",
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
        name: { singular: "Project", plural: "Projects" },
        modelName: "Project",
        tableName: "projects",
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
