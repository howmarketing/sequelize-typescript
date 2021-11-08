import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
} from "sequelize";

import { connection as sequelize } from "@database/index";
import { Project } from "@models/Project";
import { UserPhoneNumbers } from "@models/UserPhoneNumbers";
import { Tech } from "@models/Tech";
import { Address } from "@models/Address";
import { SaleOrder } from "@models/SaleOrder";

// These are all the attributes in the User model
interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public firstName!: string;
  public lastName!: string;
  public email!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  public getProjects!: HasManyGetAssociationsMixin<Project>; // Note the null assertions!
  public addProject!: HasManyAddAssociationMixin<Project, number>;
  public hasProject!: HasManyHasAssociationMixin<Project, number>;
  public countProjects!: HasManyCountAssociationsMixin;
  public createProject!: HasManyCreateAssociationMixin<Project>;

  public getTechs!: BelongsToManyGetAssociationsMixin<Tech>; // Note the null assertions!
  public addTech!: BelongsToManyAddAssociationMixin<Tech, number>;
  public hasTech!: BelongsToManyHasAssociationMixin<Tech, number>;
  public countTechs!: BelongsToManyCountAssociationsMixin;
  public createTech!: BelongsToManyCreateAssociationMixin<Tech>;

  public getPUserPhoneNumbers!: HasManyGetAssociationsMixin<UserPhoneNumbers>; // Note the null assertions!
  public addUserPhoneNumbers!: HasManyAddAssociationMixin<
    UserPhoneNumbers,
    number
  >;

  public hasUserPhoneNumbers!: HasManyHasAssociationMixin<
    UserPhoneNumbers,
    number
  >;

  public countPUserPhoneNumbers!: HasManyCountAssociationsMixin;
  public createUserPhoneNumbers!: HasManyCreateAssociationMixin<UserPhoneNumbers>;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  public readonly projects?: Project[]; // Note this is optional since it's only populated when explicitly requested in code

  public static associations: {
    projects: Association<User, Project>;
    UserPhoneNumbers: Association<User, UserPhoneNumbers>;
  };
}

User.init(
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
    sequelize,
    modelName: "user",
    tableName: "users",
    underscored: true,
    charset: "utf8mb4",
    engine: "InnoDB",
    collate: "utf8mb4_unicode_ci",
  }
);

// ASSOCIATION BETWEEN N/M TO TECHS AND USERS
User.belongsToMany(Tech, {
  foreignKey: "user_id",
  through: "users_techs",
  as: "techs",
});

// ASSOCIATION BETWEEN 1/N TO USER AND PROJECTS
User.hasMany(Project, { foreignKey: "user_id", as: "project" });

// ASSOCIATION BETWEEN 1/N TO USER AND PHONE NUMBERS
User.hasMany(UserPhoneNumbers, {
  foreignKey: "user_id",
  as: "users_phone_numbers",
});

// ASSOCIATION BETWEEN 1/N TO USER AND ADDRESSES
User.hasMany(Address, { foreignKey: "user_id", as: "addresses" });

// ASSOCIATION BETWEEN 1/N TO USER AND ORDERS
User.hasMany(SaleOrder, {
  foreignKey: "user_id",
  as: "sales_order",
});

export const doStuffWithUser = async (): Promise<User> => {
  const newUser = await User.create({
    firstName: "Johnny",
    lastName: "John",
    email: "user@gmail.com",
  });
  console.log(newUser);

  await newUser.createProject({
    name: "first!",
  });

  const ourUser = await User.findByPk(1, {
    include: [User.associations.projects],
    rejectOnEmpty: true, // Specifying true here removes `null` from the return type!
  });

  // Note the `!` null assertion since TS can't know if we included
  // the model or not
  console.log(ourUser.projects![0].name);
  return newUser;
};
