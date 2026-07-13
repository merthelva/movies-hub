import { z } from "zod";

import type {
  createLoginSchema,
  createRegisterSchema,
} from "@/features/auth/schemas";

type LoginFormValuesType = z.infer<ReturnType<typeof createLoginSchema>>;
type RegisterFormValuesType = z.infer<ReturnType<typeof createRegisterSchema>>;

export type { LoginFormValuesType, RegisterFormValuesType };
