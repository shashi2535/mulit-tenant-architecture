import express from "express"
import { logger } from "./config";
import { connection } from "./config/db.config";
import {defaultRouter} from "./routes"
const port = 8000
const app = express()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', defaultRouter);

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
  