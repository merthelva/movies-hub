import { z } from "zod";

import type { loginSchema, registerSchema } from "@/features/auth/schemas";

type LoginFormValuesType = z.infer<typeof loginSchema>;
type RegisterFormValuesType = z.infer<typeof registerSchema>;

export type { LoginFormValuesType, RegisterFormValuesType };
