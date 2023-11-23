import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { sequelizeConnection } from "../config/db.config";
import { ITenantAttributes } from "../interface";
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
      tenant_uuid: {
        type: DataTypes.UUID,
      },

      db_name: {
        type: DataTypes.UUID,
      },
      db_port: {
        type: DataTypes.INTEGER,
      },
      db_user: {
        type: DataTypes.STRING,
      },
      db_driver: {
        type: DataTypes.STRING,
      },
      db_password:{
        type: DataTypes.STRING,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'created_at',
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        field: 'updated_at',
      },
    },
    {
      timestamps: false,
      sequelize: sequelizeConnection,
      paranoid: true,
      tableName: 'tenant',
      modelName: 'Tenant',
    }
  );