import type { DeleteUserListButtonPropsType } from "../DeleteUserListButton/component.type";
import type { EditUserListButtonPropsType } from "../EditUserListButton/component.type";

type UserListActionButtonsPropsType = EditUserListButtonPropsType &
  Pick<DeleteUserListButtonPropsType, "onDeleteUserList">;

export type { UserListActionButtonsPropsType };
