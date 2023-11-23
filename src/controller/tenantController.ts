import { Request, RequestHandler, Response } from "express";
import { logger } from "../config";
import { Tenant } from "../models";
import { sequelizeConnection } from "../config/db.config";
import { NOW, QueryTypes, Sequelize } from "sequelize";
import { connectionString, generateRandomString } from "../utills";
// import { error } from "winston";
import {v4 as uuid} from "uuid"

export const createTenant: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { name } = req.body;
    const tenantData = await Tenant.findOne({
      where: {
        name: name?.trim(),
      },
    });
    const db_name = `${generateRandomString(6)}_${name}`;
    const db_driver = "mysql";
    const db_port = Number(process.env.DB_PORT);
    const db_host = process.env.DB_HOST as string;
    const db_user = generateRandomString(6);
    const db_password = `${db_user}S1234@`;
    if (tenantData) {
      return res.json({
        statusCode: 400,
        message: "Tenant Already Exist",
        data: tenantData,
      });
    }
    if (!tenantData) {
      const tenantCreateData = await Tenant.create({
        name,
        db_password,
        db_name,
        db_driver,
        db_port,
        db_user,
        tenant_uuid:uuid(),
      });

    const data =   await sequelizeConnection.query(
        `CREATE USER '${db_user}'@'${db_host}' IDENTIFIED BY '${db_password}'`,
        { type: QueryTypes.RAW }
      );
      await sequelizeConnection.query(`CREATE DATABASE ${db_name}`, {
        type: QueryTypes.RAW,
      });
      await sequelizeConnection.query(
        `GRANT ALL PRIVILEGES ON ${db_name}.* TO '${db_user}'@'${db_host}'`
      );
      const vxcString = connectionString(
        db_user,
        db_password,
        db_host,
        Number(db_port),
        db_name
      );
      let vxcData = new Sequelize(vxcString);
      vxcData.authenticate().then(() => {
        vxcData.query(`CREATE TABLE todo (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          description TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );`);
      });
      return res.json({
        statusCode: 200,
        message: "Tenant Created Successfully",
        data: tenantCreateData,
      });
    }
  } catch (e: any) {
    console.log("err", e)
    logger.error(e.message);
    return res.json({
      statusCode: 500,
      message: e.message,
    });
  }
};

export const createTodo: RequestHandler = async (req: any, res: any) => {
  try {
    const vxcData = req.vxcData
    const {todo, description} = req.body
    // const data = await vxcData.query(`select * from todo`, {type:QueryTypes.SELECT})
    const result = await vxcData.query(`INSERT INTO todo(title,description) values('${todo}', '${description}')`,{type:QueryTypes.INSERT})
    if(result.length > 0){
     const todoData = await vxcData.query(`select * from todo where id = ${result[0]}`, {type:QueryTypes.SELECT})
     if(todoData){
       return res.json({
        statusCode:400,
        message:"Todo Data Create Successfully",
        data:todoData
       })
     }
    }
  } catch (err: any) {
    console.log("err", err)
    return res.json({
      statusCode: 500,
      message: err.message,
    });
  }
};
