import type { AuthContextValueType } from "@/features/auth/types/actions.type";

type AuthContextType = AuthContextValueType & {
  logout: () => Promise<void>;
  removeAccount: (userId: number) => Promise<void>;
};

export type { AuthContextType };
