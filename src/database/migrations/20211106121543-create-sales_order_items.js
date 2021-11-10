"use strict";
const { Sequelize } = require("sequelize");

module.exports = {
  /**
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} SequelizeDataTypes
   */
  up: async (queryInterface, SequelizeDataTypes) => {
    return await queryInterface.createTable(
      "sales_order_items",
      {
        id: {
          type: SequelizeDataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        userId: {
          type: SequelizeDataTypes.INTEGER({ length: 11 }),
          allowNull: false,
          references: { model: "users", key: "id" },
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          field: "user_id",
        },
        saleOrderId: {
          type: SequelizeDataTypes.INTEGER({ length: 11 }),
          allowNull: false,
          references: { model: "sales_order", key: "id" },
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          field: "sale_order_id",
        },
        productId: {
          type: SequelizeDataTypes.INTEGER({ length: 11 }),
          allowNull: false,
          references: { model: "products", key: "id" },
          onUpdate: "NO ACTION",
          onDelete: "NO ACTION",
          field: "product_id",
        },
        productTitleAtTime:{
          type:SequelizeDataTypes.STRING,
          allowNull:true,
          defaultValue:"Product title was not setted.",
          field:"product_title_at_time"
        },
        productPriceAtTime:{
          type:SequelizeDataTypes.DOUBLE({length:11,decimals:8}),
          allowNull:true,
          defaultValue:0.000,
          field:"product_price_at_time"
        },
        productDiscountValueAppliedAtTime:{
          type:SequelizeDataTypes.DOUBLE({length:11,decimals:8}),
          allowNull:true,
          defaultValue:0.000,
          field:"product_discount_value_applied_at_time"
        },
        productDiscountLabelAtTime:{
          type:SequelizeDataTypes.STRING,
          allowNull:true,
          defaultValue:'',
          field:"product_discount_label_at_time"
        },
        createdAt: {
          type: SequelizeDataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          field: "created_at",
        },
        updatedAt: {
          type: SequelizeDataTypes.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          onUpdate: Sequelize.literal("CURRENT_TIMESTAMP").val + "",
          field: "updated_at",
        },
      },
      {
        moduleName: "sales_order_items",
        charset: "utf8mb4",
        engine: "InnoDB",
        collate: "utf8mb4_unicode_ci",
      }
    );
  },

  /**
   *
   * @param {import('sequelize').QueryInterface} queryInterface
   * @param {import('sequelize').DataTypes} SequelizeDataTypes
   */
  down: async (queryInterface, SequelizeDataTypes) => {
    await queryInterface.dropTable("sales_order_items");
  },
};
