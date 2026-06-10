import { z } from "zod";

const listCreateSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 characters")
    .regex(
      /^[A-Za-z0-9#\.\s_-]+$/,
      "Name can only contain letters, numbers, spaces, and # . _ -"
    ),
});

export { listCreateSchema };
