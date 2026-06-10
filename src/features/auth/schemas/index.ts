import { z } from "zod";

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password should be at least 6 characters long"),
});

const registerSchema = loginSchema.extend({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be at most 50 characters"),
});

export { loginSchema, registerSchema };
