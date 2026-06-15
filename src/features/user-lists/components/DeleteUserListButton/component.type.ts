import type { deleteUserFavoritelist } from "@/features/user-lists/services";

type DeleteUserListButtonPropsType = {
  listId: number;
  onDeleteUserList: typeof deleteUserFavoritelist;
};

export type { DeleteUserListButtonPropsType };
