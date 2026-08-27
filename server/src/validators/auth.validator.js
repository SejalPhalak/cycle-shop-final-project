import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required(),

  email: Joi.string().email().trim().lowercase().required(),

  password: Joi.string().min(6).max(30).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().trim().lowercase().required(),

  password: Joi.string().required(),
});

export { registerSchema , loginSchema };