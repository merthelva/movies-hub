import { z } from "zod";
import { serializeMessage } from "@/common/utils/serialize-message.util";

const loginSchema = z.object({
  email: z.email(serializeMessage("error", "Invalid email address")),
  password: z
    .string()
    .min(
      6,
      serializeMessage(
        "error",
        "Password should be at least 6 characters long",
      ),
    ),
});

const registerSchema = loginSchema.extend({
  name: z
    .string()
    .min(2, serializeMessage("error", "Name must be at least 2 characters"))
    .max(50, serializeMessage("error", "Name must be at most 50 characters")),
});

export { loginSchema, registerSchema };
