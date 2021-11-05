"use strict";
module.export = {
  dialect: "mysql", // | 'mariadb' | 'postgres' | 'mssql'
  // Dialect: "mysql", // | 'mariadb' | 'postgres' | 'mssql'
  host: "localhost",
  username: "root",
  database: "sequelize_typescript",
  password: "",
  port: 3306,
  define: {
    timestamps: true,
    underscored: true,
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  // Choose one of the logging options
  // logging: console.log,                  // Default, displays the first parameter of the log function call
  logging: (...msg) => console.log(msg), // Displays all log function call parameters
  // logging: (process.env.END_MOD === 'PROD' ? true : false),                        // Disables logging
  // logging: msg => logger.debug(msg),     // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
  // logging: logger.debug.bind(logger)     // Alternative way to use custom logger, displays all messages
};
