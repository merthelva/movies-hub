import { z } from "zod";

import { serializeMessage } from "@/common/utils/serialize-message.util";

const listCreateSchema = z.object({
  name: z
    .string()
    .min(1, serializeMessage("error", "Name is required"))
    .max(50, serializeMessage("error", "Name must be at most 50 characters"))
    .regex(
      /^[A-Za-z0-9#\.\s_-]+$/,
      serializeMessage(
        "error",
        "Name can only contain letters, numbers, spaces, and # . _ -",
      ),
    ),
});

export { listCreateSchema };
