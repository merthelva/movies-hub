import type { AuthFormModeType } from "@/features/auth/types/component.type";

type AuthModalPropsType = {
  mode: AuthFormModeType;
  redirectTo?: string;
};

export type { AuthModalPropsType };
