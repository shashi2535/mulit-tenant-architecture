import {Router} from "express"
import {userRouter} from "./user.routes"
import {RouteConstants} from "../constants"
const defaultRouter = Router()

defaultRouter.use(RouteConstants.USER_AUTH.default, userRouter)


export {defaultRouter}

