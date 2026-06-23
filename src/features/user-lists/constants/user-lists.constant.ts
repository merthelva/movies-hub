import type { UserListType } from "@/features/user-lists/types/user-list.type";

const userLists = new Set(["favoritelists", "watchlists"]) as Set<UserListType>;

export { userLists };
