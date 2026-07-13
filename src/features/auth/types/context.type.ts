import type { AuthContextValueType } from "@/features/auth/types/actions.type";
import type { GenericResponseType } from "@/common/types/generic-response.type";
import type { SuccessResponseType } from "@/common/types/success-response.type";

type AuthContextType = AuthContextValueType & {
  logout: () => Promise<void>;
  deleteAccount: (
    userId: number,
  ) => Promise<GenericResponseType<SuccessResponseType>>;
  refreshUser: () => Promise<void>;
};

export type { AuthContextType };
