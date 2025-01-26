import Joi from "joi";

export const productValid = Joi.object({
    name: Joi.string().required().min(3),
    point: Joi.number().required().default(0),
    phone: Joi.number().required().min(10).max(10)
})