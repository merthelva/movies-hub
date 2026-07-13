import type { AuthContextValueType } from "@/features/auth/types/actions.type";

type ProfileDetailsPropsType = Omit<
  NonNullable<AuthContextValueType["user"]>,
  "id"
>;

export type { ProfileDetailsPropsType };
