import * as Joi from 'joi'

export const categorySchema = Joi.object({
  category_name: Joi.string().required()
})