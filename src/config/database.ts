import { SequelizeOptions } from "sequelize-typescript";

const dialectName = "mysql" as
  | "mysql"
  | "postgres"
  | "sqlite"
  | "mariadb"
  | "mssql";

export const databaseConfig: SequelizeOptions = {
  dialect: dialectName,
  host: "localhost",
  username: "root",
  database: "sequelize_typescript_1",
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

  // logging: console.log,                  // Default, displays the first parameter of the log function call
  logging: (...msg: Array<any>) => console.log(msg), // Displays all log function call parameters
  // logging: (process.env.END_MOD === 'PROD' ? true : false),                        // Disables logging
  // logging: msg => logger.debug(msg),     // Use custom logger (e.g. Winston or Bunyan), displays the first parameter
  // logging: logger.debug.bind(logger)     // Alternative way to use custom logger, displays all messages
};
