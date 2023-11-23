import { Dialect, Sequelize } from "sequelize";
import { logger } from "./logger";
import { config } from "../constants";
import { connectionString } from "../utills";
const {
  DB: { DB_DATABASE, DB_DIALECT, DB_HOST, DB_PASSWORD, DB_USERNAME, DB_PORT },
} = config;
const dbName = DB_DATABASE as string;
const dbUser = DB_USERNAME as string;
const dbHost = DB_HOST as string;
const dbDriver = DB_DIALECT as Dialect;
const dbPassword = DB_PASSWORD as string;

const vxcString = connectionString(
  dbUser,
  dbPassword,
  dbHost,
  Number(DB_PORT),
  dbName
);

let sequelizeConnection = new Sequelize(vxcString, {
  host: dbHost,
  dialect: dbDriver,
  logging: false,
});
const connection = async () => {
  await sequelizeConnection
    .authenticate()
    .then(() => {
      logger.info("😀 database connected successfully");
    })
    .catch(async (err: any) => {
      logger.error("database not connected");
    });
};

export { sequelizeConnection, connection };
