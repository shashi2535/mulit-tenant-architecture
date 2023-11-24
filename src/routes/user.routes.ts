import {Router} from "express"
import {RouteConstants} from "../constants"
import {createTenant, createTodo, deleteTenant, allTenant} from "../controller"
import { createTenantValidation, createTodoValidation } from "../validation"
import { checkVxc } from "../middleware"
const userRouter = Router()

userRouter.route(RouteConstants.USER_AUTH.ALL)
.post(createTenantValidation,createTenant)
.get(allTenant)

userRouter.route(RouteConstants.USER_AUTH.todo)
.post(createTodoValidation,checkVxc,createTodo)

userRouter.route(RouteConstants.USER_AUTH.BY_ID)
.delete(deleteTenant)

export {userRouter}
