import { QueryTypes, Sequelize } from "sequelize";
import { Tenant } from "../models";
export const checkVxc = async (req: any, res: any, next: any) => {
  try {
    const { tenant_id } = req.body;
    const tenantData = await Tenant.findOne({
      where: { tenantUuid: tenant_id },
      raw: true,
    });
    if (!tenantData) {
      return res.json({
        statusCode: 400,
        message: "Tenant Not Found",
      });
    }
    let vxcData = new Sequelize(
      tenantData.db_name as string,
      tenantData.db_user as string,
      tenantData.db_password,
      {
        host: "localhost",
        dialect: "mysql",
        logging: false,
      }
    );
  await  vxcData.authenticate().then(async()=>{
      // console.log("connected")
      req.vxcData = vxcData
      next()
    }).catch((err)=>{
      return res.json({
        statusCode:500,
        message:"Not connected"
      })
    })
  } catch (err: any) {
    console.log("err", err);
  }
};
