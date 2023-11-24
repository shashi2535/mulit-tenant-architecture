import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelizeConnection } from "../config/db.config";
import { ITenantAttributes } from "../interface";
import { Author } from "./author";
import { Tenant_Author } from "./tenant_author";
 type tenantInput = Optional<ITenantAttributes, 'id'>;

 export class Tenant extends  Model<ITenantAttributes, tenantInput> implements ITenantAttributes {
    public id!: number;
    public name?: string;
    public tenant_uuid?:string;
    public db_name?:string;
    public db_port?:number;
    public db_user?:string;
    public db_driver?:string;
    public db_password?:string;
    // timestamps!
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
  }
  Tenant.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      tenantUuid: {
        type: DataTypes.UUID,
      },

      dbName: {
        type: DataTypes.UUID,
      },
      dbPort: {
        type: DataTypes.INTEGER,
      },
      dbUser: {
        type: DataTypes.STRING,
      },
      dbDriver: {
        type: DataTypes.STRING,
      },
      dbPassword:{
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      sequelize: sequelizeConnection,
      paranoid: true,
      tableName: 'tenant',
      modelName: 'Tenant',
      underscored:true
    }
  );
// Tenant.hasMany(Tenant_Author,{as:"tenat_author"})


Tenant.belongsToMany(Author, { through:  "Tenant_Author"});
Author.belongsToMany(Tenant, { through: "Tenant_Author" });

Tenant.addScope('getTenat',{
    where: { name:"s1" },
});

