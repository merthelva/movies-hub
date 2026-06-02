import type {
  AuthContextValueType,
  LoginCredentialsType,
  RegisterCredentialsType,
} from "@/features/auth/types/actions.type";

type AuthContextType = AuthContextValueType & {
  login: (credentials: LoginCredentialsType) => Promise<void>;
  logout: () => Promise<void>;
  register: (credentials: RegisterCredentialsType) => Promise<void>;
  removeAccount: (userId: number) => Promise<void>;
};

export type { AuthContextType };
