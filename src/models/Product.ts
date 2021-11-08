"use strict";
import { Model, DataTypes, Optional, Sequelize } from "sequelize";

import { connection as sequelize } from "@database/index";
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

export class Product
  extends Model<ProductAttributes, ProductCreationAttributes>
  implements ProductAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public productTitle!: string;
  public productDescription!: string;
  public productPrice!: number;

  // timestamps!
  public createdAt!: Date;
  public updatedAt!: Date;

  constructor(...args) {
    super(...args);
    Product._init();
  }

  public static _init() {
    this.init(
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
        sequelize,
        modelName: "Product",
        tableName: "sales_order_aditional_infos",
        underscored: true,
        charset: "utf8mb4",
        engine: "InnoDB",
        collate: "utf8mb4_unicode_ci",
      }
    );
  }
}

Product.belongsTo(SaleOrderItem, {
  foreignKey: "product_id",
  as: "sales_order_items",
});
