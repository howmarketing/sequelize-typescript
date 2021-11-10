"use strict";

import { Request, Response } from "express";
import sequelize, { Model, Op } from "sequelize";
// Import model props
import TesteModelProps from "@models/autoGenerated/Teste";
// Define sequelize connection type to use your attributes
type sequelizeConnection = typeof sequelize.Sequelize.prototype;
// save the global sequelize connection to a const 
const modelInstanceType = TesteModelProps.getModelClass();
// Enable sequelize connection through an const called sequelizeConnection 
const sequelizeConnection:sequelizeConnection = global.sequelizeConnection as any;
// console.log("sequelizeConnection at TesteController: ",sequelizeConnection);
// Recover the model instance from initiated models through sequelize connection implementing the model instance type
const ModelInstance = sequelizeConnection.model("Teste") as typeof modelInstanceType;
// console.log("ModelInstance<Model<Teste>> At Controller: ",ModelInstance);

export default {
  async store(req: Request, res: Response) {
    // Set values
    const { name, email } = req?.body || {
      name: "No name",
      email: "NoEmail@gmail.com",
    };

    try {
      const createdData = await ModelInstance.create({
        first_name: name,
        last_name: "Ariza",
        email: email,
      });
      
      return {
        success: true,
        msg: "Success created user!",
        item: createdData,
      };
    } catch (e: any) {
      return {
        success: false,
        msg: "Create user fails with follow catch response: " + e.message,
        item: {},
      };
    }
  },
};
