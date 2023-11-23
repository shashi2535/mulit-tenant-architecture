import {Router} from "express"
import {RouteConstants} from "../constants"
import {createTenant, createTodo} from "../controller"
import { createTenantValidation, createTodoValidation } from "../validation"
import { checkVxc } from "../middleware"
const userRouter = Router()

userRouter.route(RouteConstants.USER_AUTH.ALL)
.post(createTenantValidation,createTenant)

userRouter.route(RouteConstants.USER_AUTH.todo)
.post(createTodoValidation,checkVxc,createTodo)

export {userRouter}
