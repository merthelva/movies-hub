type AuthFormModeType = "login" | "register";

type AuthFormPropsType = {
  mode: AuthFormModeType;
  redirectTo?: string;
};

export type { AuthFormModeType, AuthFormPropsType };
