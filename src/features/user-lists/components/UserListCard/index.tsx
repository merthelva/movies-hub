import styles from "./styles.module.scss";
import type { UserListCardPropsType } from "./component.type";
import { NavLink } from "@/components/ui/NavLink";
import { deleteUserFavoritelist, deleteUserWatchlist } from "../../services";
import { DeleteUserListButton } from "../DeleteUserListButton";

const UserListCard = ({
  id,
  name,
  createdAt,
  listType,
}: UserListCardPropsType) => {
  const [date] = createdAt.split("T");

  const deleteUserListFn =
    listType === "favoritelists"
      ? deleteUserFavoritelist.bind(null, id)
      : deleteUserWatchlist.bind(null, id);

  return (
    <NavLink href={`/user/${listType}/id/${id}/movies`} className={styles.card}>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.date}>{date}</p>
      </div>
      <DeleteUserListButton listId={id} onDeleteUserList={deleteUserListFn} />
    </NavLink>
  );
};

export { UserListCard };
