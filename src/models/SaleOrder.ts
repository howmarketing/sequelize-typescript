"use strict";
import { Model, DataTypes, Optional, Sequelize, BelongsTo } from "sequelize";

import { connection as sequelize } from "@database/index";
import { User } from "@models/User";

// These are all the attributes in the SaleOrder model
interface SaleOrderAttributes {
  id: number;
  userId: number;
  addressText: string;
  paymentGetway: string;
  paymentId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Some attributes are optional in `SaleOrder.build` and `SaleOrder.create` calls
interface SaleOrderCreationAttributes
  extends Optional<SaleOrderAttributes, "id"> {}

export class SaleOrder
  extends Model<SaleOrderAttributes, SaleOrderCreationAttributes>
  implements SaleOrderAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public userId!: number;
  public addressText!: string;
  public paymentGetway!: string;
  public paymentId!: string;

  // timestamps!
  public createdAt!: Date;
  public updatedAt!: Date;

  public getUser!: BelongsTo<User>;
}

SaleOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      field: "user_id",
    },
    addressText: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "address_text",
    },
    paymentGetway: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "payment_getway",
    },
    paymentId: {
      type: DataTypes.STRING({ length: 255 }),
      allowNull: false,
      field: "payment_id",
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
    modelName: "SaleOrder",
    tableName: "sales_order",
    underscored: true,
    charset: "utf8mb4",
    engine: "InnoDB",
    collate: "utf8mb4_unicode_ci",
  }
);

// ASSOCIATION BETWEEN N/M TO TECHS AND SaleOrderS
SaleOrder.belongsTo(User, { foreignKey: "user_id", as: "user" });
