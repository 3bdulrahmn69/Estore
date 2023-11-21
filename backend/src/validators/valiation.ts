import * as Joi from "joi";

export const categorySchema = Joi.object({
  category_name: Joi.string().required(),
});

export const productSchema = Joi.object({
  product_name: Joi.string().required(),
  product_desc: Joi.string().required(),
  product_price: Joi.number().required(),
  product_amount: Joi.number().required(),
  category_name: Joi.string().required(),
});

export const updateSchema = Joi.object({
  product_name: Joi.string().optional(),
  product_desc: Joi.string().optional(),
  product_price: Joi.number().optional(),
  product_amount: Joi.number().optional(),
});

export const createUser = Joi.object({
  first_name: Joi.string().min(3).required(),
  last_name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid("admin").optional(),
});
