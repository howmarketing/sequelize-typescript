"use strict";
import { DataTypes, Optional, Sequelize, ModelDefined } from "sequelize";

import { connection } from "@database/index";
import { SaleOrderItem } from "@models/SaleOrderItem";

// These are all the attributes in the Product model
interface ProductAttributes {
  id: number;
  productTitle: string;
  productDescription: string;
  productPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

// Some attributes are optional in `Product.build` and `Product.create` calls
interface ProductCreationAttributes extends Optional<ProductAttributes, "id"> {}
export const Product: ModelDefined<
  ProductAttributes,
  ProductCreationAttributes
> = connection.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    productTitle: {
      type: DataTypes.STRING({ length: 255 }),
      allowNull: false,
      field: "title",
    },
    productDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "description",
    },
    productPrice: {
      type: DataTypes.DOUBLE({ length: 11, decimals: 8 }),
      allowNull: false,
      defaultValue: 0.0,
      field: "price",
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
    name: { singular: "Product", plural: "Products" },
    modelName: "Product",
    tableName: "products",
    underscored: true,
    charset: "utf8mb4",
    engine: "InnoDB",
    collate: "utf8mb4_unicode_ci",
  }
);
(async () => {
  await connection.sync({ force: false, alter: false });

  Product.belongsTo(SaleOrderItem, {
    foreignKey: "product_id",
    as: "sales_order_items",
  });
})();
