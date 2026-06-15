import type { UserListType } from "@/features/user-lists/types/user-list.type";

type EditUserListButtonPropsType = {
  listId: number;
  listName: string;
  userListType: UserListType;
};

export type { EditUserListButtonPropsType };
