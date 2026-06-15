import type { UserListType } from "../types/user-list.type";

const userLists = new Set(["favoritelists", "watchlists"]) as Set<UserListType>;

export { userLists };
