import { Optional, DataTypes } from "sequelize";
import { Model } from "sequelize-typescript";

export const initOptions = {
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
    field: "email",
  },
};
export const dataTable = {
  tableName: "teste",
};

// These are all the attributes in the User model
export interface TesteAttributes {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// Some attributes are optional in `User.build` and `User.create` calls
export interface TesteCreationAttributes
  extends Optional<TesteAttributes, "id"> {}

export class Teste
  extends Model<TesteAttributes, TesteCreationAttributes>
  implements TesteAttributes
{
  public id!: number; // Note that the `null assertion` `!` is required in strict mode.
  public firstName!: string;
  public lastName!: string; // for nullable fields
  public email!: string; // for nullable fields

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static {
    let X = this.init();
    return "G";
  }

}
// export const TesteClass = class {
//   static init(connection: any) {
//     (async () => {
//       dataTable.sequelize = connection;
//       await connection.sync({ force: false, alter: false });
//       const testeModelClass = Teste.init(initOptions, dataTable);
//       await testeModelClass.sync({ force: true });
//     })();
//     connection.models.Teste = Teste;
//     Teste.init(initOptions, dataTable);
//     return Teste;
//   }
// };
