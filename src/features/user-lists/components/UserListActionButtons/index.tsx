import type { UserListActionButtonsPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { DeleteUserListButton } from "@/features/user-lists/components/DeleteUserListButton";
import { EditUserListButton } from "@/features/user-lists/components/EditUserListButton";

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
