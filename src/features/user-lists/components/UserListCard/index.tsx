import type { UserListCardPropsType } from "./component.type";
import styles from "./styles.module.scss";

import { NavLink } from "@/components/ui/NavLink";
import { deleteUserFavoritelist, deleteUserWatchlist } from "@/features/user-lists/services";
import { UserListActionButtons } from "@/features/user-lists/components/UserListActionButtons";

const UserListCard = ({
  id,
  name,
  createdAt,
  userListType,
}: UserListCardPropsType) => {
  const [date] = createdAt.split("T");

  const deleteUserListFn =
    userListType === "favoritelists"
      ? deleteUserFavoritelist.bind(null, id)
      : deleteUserWatchlist.bind(null, id);

  return (
    <article className={styles.card}>
      <NavLink
        className={styles.link}
        href={`/user/${userListType}/id/${id}/movies`}
      >
        <div className={styles.info}>
          <h3 className={styles.name}>{name}</h3>
          <p className={styles.date}>{date}</p>
        </div>
      </NavLink>
      <UserListActionButtons
        listId={id}
        listName={name}
        userListType={userListType}
        onDeleteUserList={deleteUserListFn}
      />
    </article>
  );
};

export { UserListCard };
