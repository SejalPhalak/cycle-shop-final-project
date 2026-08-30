import Joi from "joi";

const cycleSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),

  description: Joi.string().trim().min(10).required(),

  price: Joi.number().min(0).required(),

  image: Joi.string().trim().required(),

  category: Joi.string().trim().required(),

  stock: Joi.number().integer().min(0).required(),

  brand: Joi.string().trim().required(),
});

const updateCycleSchema = cycleSchema.fork(
  ["image"],
  (schema) => schema.optional()
);

export { cycleSchema, updateCycleSchema };