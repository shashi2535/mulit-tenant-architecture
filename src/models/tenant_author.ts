import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConnection } from "../config/db.config";
import { ITenantAuthorAttributes } from "../interface";
import { Author } from "./author";
import { Tenant } from "./tenant";
 type authorInput = Optional<ITenantAuthorAttributes, 'id'>;

 export class Tenant_Author extends  Model<ITenantAuthorAttributes, authorInput> implements ITenantAuthorAttributes {
    public id!: number;
    public tenantId?: number;
    public authorId?: number;
    // timestamps!
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
  }
  Tenant_Author.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      tenantId: {
        type: DataTypes.INTEGER,
      },
      authorId: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
      sequelize: sequelizeConnection,
      paranoid: true,
      tableName: 'tenant_auther',
      modelName: 'Tenant_Author',
      underscored:true
    }
  );
  Tenant.belongsToMany(Author, { through: "Tenant_Author" , as:"tenant_author" });
  Author.belongsToMany(Tenant, { through: "Tenant_Author", as:"author_tenant" });