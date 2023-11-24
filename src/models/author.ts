import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from "../config/db.config";
import { IAuthorAttributes } from "../interface";
import { Tenant } from "./tenant";
import { Tenant_Author } from "./tenant_author";
 type authorInput = Optional<IAuthorAttributes, 'id'>;

 export class Author extends  Model<IAuthorAttributes, authorInput> implements IAuthorAttributes {
    public id!: number;
    public authorName?: string;
    // timestamps!
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
  }
  Author.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      authorName: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      sequelize: sequelizeConnection,
      paranoid: true,
      tableName: 'auther',
      modelName: 'Author',
      underscored:true
    }
  );