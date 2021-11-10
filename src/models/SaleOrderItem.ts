"use strict";
import { DataTypes, Optional, Sequelize, ModelDefined } from "sequelize";

import { connection } from "@database/index";
import { User } from "@models/User";
import { SaleOrder } from "@models/SaleOrder";
import { Product } from "@models/Product";

// These are all the attributes in the SaleOrderItem model
interface SaleOrderItemAttributes {
  id: number;
  userId: number;
  saleOrderId: number;
  productId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Some attributes are optional in `SaleOrderItem.build` and `SaleOrderItem.create` calls
interface SaleOrderItemCreationAttributes
  extends Optional<SaleOrderItemAttributes, "id"> {}

export const SaleOrderItem: ModelDefined<
  SaleOrderItemAttributes,
  SaleOrderItemCreationAttributes
> = connection.define(
  "SaleOrderItem",
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
    saleOrderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: "sales_order", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
      field: "sale_order_id",
    },
    productId: {
      type: DataTypes.INTEGER({ length: 11 }),
      allowNull: false,
      references: { model: "products", key: "id" },
      onUpdate: "NO ACTION",
      onDelete: "CASCADE",
      field: "product_id",
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
    name: { singular: "SaleOrderItem", plural: "SalesOrderItems" },
    modelName: "SaleOrderItem",
    tableName: "sales_order_items",
    underscored: true,
    charset: "utf8mb4",
    engine: "InnoDB",
    collate: "utf8mb4_unicode_ci",
  }
);

(async () => {
  await connection.sync({ force: false, alter: false });
  SaleOrderItem.belongsTo(User, {
    foreignKey: "user_id",
    as: "users",
  });
  SaleOrderItem.belongsTo(SaleOrder, {
    foreignKey: "sales_order_id",
    as: "sales_order",
  });
  SaleOrderItem.hasOne(Product, { foreignKey: "product_id", as: "product" });
})();
