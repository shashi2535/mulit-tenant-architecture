import express from "express"
import { logger } from "./config";
import { connection } from "./config/db.config";
import { Author, Tenant, Tenant_Author } from "./models";
import {defaultRouter} from "./routes"
const port = 8000
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', defaultRouter);

app.get("/author", async(req,res)=>{
  const {tenantId,authorId} = req.body
// const authorData = await Author.create({authorName})
// const createData = await Tenant_Author.create({
//   tenantId,
//   authorId
// })
const tenant_authorData = await Tenant.findAll({include: {
  model:Author,
  as:"tenant_author"
}})
// console.log("tenant_authorData",tenant_authorData)
return res.json({
  statusCode:200,
  message:"tenant_authorData created successfully",
  data:tenant_authorData
})
})

app.all('*', (req,res, _) => {
//  return next(new ApiError(`Can't find ${req?.originalUrl} on this server!`, 404))
return res.json({
  statusCode: 404,
  message:`Can't find ${req?.originalUrl} on this server!`
})
});
  
app.listen(port, () => {
    logger.info(`🚀 App listening on the port ${port}`);
    connection()
  });
  