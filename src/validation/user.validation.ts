import Joi from "joi"
import {Request, Response, NextFunction} from "express"


export const  createTenantValidation = (req:Request, res:Response, next:NextFunction) => {
    const validateCreatePort = (user:any) => {
      const JoiSchema = Joi.object({
        name:Joi.string().required(),
        });
      return JoiSchema.validate(user);
    };
    const response = validateCreatePort(req.body);
    if (response.error) {
      const { message } = response.error.details[0];
      return res.json({
        statusCode: 422,
        message,
      });
    }
    return next();
  };
  
  export const  createTodoValidation = (req:Request, res:Response, next:NextFunction) => {
    const validateCreatePort = (user:any) => {
      const JoiSchema = Joi.object({
        todo:Joi.string().required(),
        description:Joi.string().required(),
        tenant_id: Joi.string().required()
        });
      return JoiSchema.validate(user);
    };
    const response = validateCreatePort(req.body);
    if (response.error) {
      const { message } = response.error.details[0];
      return res.json({
        statusCode: 422,
        message,
      });
    }
    return next();
  };
  