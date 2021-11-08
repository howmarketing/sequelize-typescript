"use strict";
import { Request, Response } from "express";
import { Tech } from "@models/Tech";
import { User } from "@models/User";
import { Op } from "sequelize";
import { UserPhoneNumbers } from "@models/UserPhoneNumbers";
export class UserController {
  public conn: string;
  constructor() {
    this.conn = "aa";
  }

  async store(req: Request, res: Response) {
    const { name, email } = req?.body || {
      name: "No name",
      email: "NoEmail@gmail.com",
    };
    try {
      const createdUserData = await User.create({
        firstName: name,
        lastName: "Ariza",
        email: email,
      });
      return {
        success: true,
        msg: "Success created user!",
        item: createdUserData,
      };
    } catch (e: any) {
      return {
        success: false,
        msg: "Create user fails with follow catch response: " + e.message,
        item: {},
      };
    }
  }

  async getTechs(req: Request, res: Response) {
    try {
      const { userId } = req?.params || {};
      const { techName } = req?.query || {};
      const userWhereClausule = userId
        ? { id: userId }
        : { id: { [Op.gte]: 1 } };
      const techWhereClausule = techName
        ? {
            name: {
              [Op.like]: `%${(techName + "").trim().split(" ").join("%")}%`,
            },
          }
        : { id: { [Op.gte]: 1 } };
      const usersTechs = await User.findAll({
        where: userWhereClausule,
        order: [["name", "DESC"]],
        include: {
          model: Tech,
          as: "techs",
          where: techWhereClausule,
          order: [["name", "ASC"]],
        },
      });
      return {
        success: true,
        msg: "List user(s) techs founded",
        items: usersTechs,
      };
    } catch (e: any) {
      return {
        success: false,
        msg: "Get user(s) techs failed with: " + e.message,
      };
    }
  }

  async addTech(req: Request, res: Response) {
    try {
      // create consts values propertly
      const { userId } = req?.params || {};
      const { techName } = req?.body || { techName: "" };

      let userModel: User;
      let techModel: Tech;
      let userTechsModel: User;

      // Get user model to add tech
      try {
        userModel = await User.findByPk(userId);
        if (!userModel) {
          return {
            success: false,
            msg: `No user founded for id ${userId}`,
            item: {},
          };
        }
        // return { success: true, msg: 'Test get user by id ' + userId, item: userModel };
      } catch (e: any) {
        console.log("find user by id fail: ", e);
        throw new Error(
          `Fail when try to get user model by id: ${userId} with error: ${e.message}`
        );
      }
      // Get user model to add tech
      try {
        techModel = await Tech.findOne({
          where: { name: { [Op.like]: (techName + "").trim() } },
        });
        if (!techModel) {
          return {
            success: false,
            msg: `No tech founded for name ${techName}`,
            item: {},
          };
        }
        // return { success: true, msg: 'Test get tech by name ' + techName, item: techModel };
      } catch (e: any) {
        console.log("find tech by name fail: ", e);
        throw new Error(
          "Fail when try to get tech model by name: " +
            techName +
            " with error: " +
            e.message
        );
      }

      // find tech already associated with user
      try {
        userTechsModel = await User.findOne({
          attributes: [
            ["id", "userId"],
            ["name", "user_name"],
            ["email", "user_email"],
            "created_at",
            "updated_at",
          ],
          where: { id: userId },
          include: [
            {
              model: Tech,
              as: "techs",
              attributes: [
                ["id", "tech_id"],
                ["name", "techName"],
                "created_at",
                "updated_at",
              ],
              where: { id: techModel.id },
            },
          ],
        });
        if (userTechsModel) {
          return {
            success: false,
            msg: `User ${userModel.firstName} already have the ${techModel.name} tech associated with!`,
          };
        }
        // return { success: true, msg: 'Test get user techs', item: userTechsModel };
      } catch (e: any) {
        console.log("find user techs", e);
        throw new Error(
          `Fail when try to get user techs associating many: ${e.message}`
        );
      }

      // Add tech to user relationship
      try {
        if (!("addTech" in userModel)) {
          return {
            success: false,
            msg: `Rules for add tech to user was\`nt founded.`,
            item: {},
          };
        }
        const userAssociatedTech = await userModel.addTech(techModel);

        console.log("userAssociatedTech: ", userAssociatedTech);

        return {
          success: true,
          msg: `The tech ${techModel.name} has been associated to user ${userModel.firstName}`,
          item: userAssociatedTech,
        };
      } catch (e: any) {
        console.log("add tech to user fail: ", e);
        throw new Error(
          `Associate tech ${techModel.name} to user ${userModel.firstName} has been failed!`
        );
      }
    } catch (e: any) {
      return { success: false, msg: e.message };
    }
  }

  async getUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll({
        include: [
          {
            model: Tech,
            as: "techs",
          },
          {
            model: UserPhoneNumbers,
            as: "user_phone_numbers",
          },
        ],
      });
      return { success: true, msg: "Success find users!", items: users };
    } catch (e: any) {
      return {
        success: false,
        msg: "Find users fails with follow catch response: " + e.message,
        items: [],
      };
    }
  }

  async getUserById(req: Request, res: Response) {
    try {
      const user = await User.findByPk("id", {});
      return { success: true, msg: "Success find users!", item: user };
    } catch (e: any) {
      return {
        success: false,
        msg: `Find users fails with follow catch response: ${e.message}`,
        item: undefined,
      };
    }
  }
}
