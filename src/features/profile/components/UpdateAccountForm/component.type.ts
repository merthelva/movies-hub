import type { AuthContextValueType } from "@/features/auth/types/actions.type";

type UpdateAccountFormPropsType = NonNullable<AuthContextValueType["user"]>;

export type { UpdateAccountFormPropsType };
