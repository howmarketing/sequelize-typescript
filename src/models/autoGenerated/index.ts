"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize-typescript");
const basename = path.basename(__filename);
// eslint-disable-next-line node/no-path-concat
let config = require("./../../config/sequelize-cli-config.json");

const env = process.env.NODE_ENV || ("development" as keyof typeof config);
config = config[env];
const db = {};

let sequelize = {};

sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
