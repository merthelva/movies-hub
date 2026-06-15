import type { UserListType } from "@/features/user-lists/types/user-list.type";

type UserListCardPropsType = {
  id: number;
  name: string;
  createdAt: string;
  userListType: UserListType;
};

export type { UserListCardPropsType };
