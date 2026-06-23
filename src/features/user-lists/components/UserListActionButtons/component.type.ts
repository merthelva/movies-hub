import type { DeleteUserListButtonPropsType } from "@/features/user-lists/components/DeleteUserListButton/component.type";
import type { EditUserListButtonPropsType } from "@/features/user-lists/components/EditUserListButton/component.type";

type UserListActionButtonsPropsType = EditUserListButtonPropsType &
  Pick<DeleteUserListButtonPropsType, "onDeleteUserList">;

export type { UserListActionButtonsPropsType };
