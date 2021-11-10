import { Optional, DataTypes, ModelDefined, Model } from "sequelize";
import { connection, connection as sequelizeConn } from "@database/index";
import { Project } from "@models/Project";
import { UserPhoneNumbers } from "@models/UserPhoneNumbers";
import { Tech } from "@models/Tech";
import { Address } from "@models/Address";
import { SaleOrder } from "@models/SaleOrder";

// These are all the attributes in the User model
export interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
export interface UserCreationAttributes
  extends Optional<UserAttributes, "id"> {}
export class UserClass
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public firstName!: string;
  public lastName!: string; // for nullable fields
  public email!: string; // for nullable fields

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
UserClass.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: connection,
    modelName: "User",
    name: { singular: "User", plural: "Users" },
    underscored: true,
    charset: "utf8mb4",
  }
);

export const User: ModelDefined<UserAttributes, UserCreationAttributes> =
  sequelizeConn.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "first_name",
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "last_name",
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      name: { singular: "User", plural: "Users" },
      modelName: "User",
      tableName: "users",
      underscored: true,
      charset: "utf8mb4",
      engine: "InnoDB",
      collate: "utf8mb4_unicode_ci",
    }
  );

(async () => {
  await connection.sync({ force: false, alter: false });
  // User.build();
  // connection.models.User = User;
  // ASSOCIATION BETWEEN N/M TO TECHS AND USERS
  User.belongsToMany(Tech, {
    foreignKey: "user_id",
    through: "users_techs",
    as: "techs",
  });

  // ASSOCIATION BETWEEN 1/N TO USER AND PROJECTS
  User.hasMany(Project, { foreignKey: "user_id", as: "projects" });

  // ASSOCIATION BETWEEN 1/N TO USER AND PHONE NUMBERS
  User.hasMany(UserPhoneNumbers, {
    foreignKey: "user_id",
    as: "users_phone_numbers",
  });

  // ASSOCIATION BETWEEN 1/N TO USER AND ADDRESSES
  User.hasMany(Address, { foreignKey: "user_id", as: "address" });

  // ASSOCIATION BETWEEN 1/N TO USER AND ORDERS
  User.hasMany(SaleOrder, {
    foreignKey: "user_id",
    as: "sales_order",
  });
})();
