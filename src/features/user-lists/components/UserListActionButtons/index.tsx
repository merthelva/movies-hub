"use client";

import { DeleteUserListButton } from "../DeleteUserListButton";
import { EditUserListButton } from "../EditUserListButton";
import type { UserListActionButtonsPropsType } from "./component.type";
import styles from "./styles.module.scss";

const UserListActionButtons = ({
  listId,
  listName,
  userListType,
  onDeleteUserList,
}: UserListActionButtonsPropsType) => {
  return (
    <div className={styles.actions}>
      <EditUserListButton
        listId={listId}
        listName={listName}
        userListType={userListType}
      />
      <DeleteUserListButton
        listId={listId}
        onDeleteUserList={onDeleteUserList}
      />
    </div>
  );
};

export { UserListActionButtons };
