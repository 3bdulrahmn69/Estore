import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";

function joiAsyncMiddleWare(
  schema: Joi.ObjectSchema<any>,
  meta: "body" | "params" | "query" = "body"
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = await schema.validateAsync(req[meta], {
        abortEarly: false,
      });

      if (error) {
        const validationErrors = error.details.map(
          (detail: any) => detail.message
        );
        return res.status(400).json({ errors: validationErrors });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
}

export default joiAsyncMiddleWare;
