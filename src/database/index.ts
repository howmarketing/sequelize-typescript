"use strict";
import { Sequelize } from "sequelize-typescript";
import { databaseConfig } from "@config/database";
// import { User } from "@models/User";

// const UsersPhoneNumbers = require('./../models/UsersPhoneNumbers');
// const Tech = require('./../models/Tech');
global.connection = global?.connection || false;
export const connection = new Sequelize(databaseConfig);

// User.init(connection);
// UsersPhoneNumbers.init(connection);
// Tech.init(connection);
// UsersPhoneNumbers.associate(connection.models);
// User.associate(connection.models);
// Tech.associate(connection.models);
