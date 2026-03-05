const { z } = require("zod");

const createProductSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  category: z.string(),
  stock: z.number().int().nonnegative(),
});

module.exports = {
  createProductSchema,
};