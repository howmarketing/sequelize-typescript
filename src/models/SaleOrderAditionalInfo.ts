"use strict";
import { Model, DataTypes, Optional, Sequelize, BelongsTo } from "sequelize";

import { connection as sequelize } from "@database/index";
import { User } from "@models/User";
import { SaleOrder } from "@models/SaleOrder";

// These are all the attributes in the SaleOrderAditionalInfo model
interface SaleOrderAditionalInfoAttributes {
  id: number;
  userId: number;
  saleOrderId: number;
  infoKey: string;
  infoSubject: string;
  infoMessage: string;
  createdAt: Date;
  updatedAt: Date;
}

// Some attributes are optional in `SaleOrderAditionalInfo.build` and `SaleOrderAditionalInfo.create` calls
interface SaleOrderAditionalInfoCreationAttributes
  extends Optional<SaleOrderAditionalInfoAttributes, "id"> {}

export class SaleOrderAditionalInfo
  extends Model<
    SaleOrderAditionalInfoAttributes,
    SaleOrderAditionalInfoCreationAttributes
  >
  implements SaleOrderAditionalInfoAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public userId!: number;
  public saleOrderId!: number;
  public infoKey!: string;
  public infoSubject!: string;
  public infoMessage!: string;

  // timestamps!
  public createdAt!: Date;
  public updatedAt!: Date;

  public getUser!: BelongsTo<User>;
  public getSaleOrder!: BelongsTo<SaleOrder>;
}

SaleOrderAditionalInfo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
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
      field: "created_at",
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
      onUpdate: Sequelize.literal("CURRENT_TIMESTAMP").val + "",
    },
  },
  {
    sequelize,
    modelName: "SaleOrderAditionalInfo",
    tableName: "sales_order_aditional_infos",
    underscored: true,
    charset: "utf8mb4",
    engine: "InnoDB",
    collate: "utf8mb4_unicode_ci",
  }
);

SaleOrderAditionalInfo.belongsTo(User, {
  foreignKey: "user_id",
  as: "users",
});
SaleOrderAditionalInfo.belongsTo(SaleOrder, {
  foreignKey: "sale_order_id",
  as: "sales_order",
});
