import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { Alert } from "@/components/ui/Alert";
import { UserListCard } from "@/features/user-lists/components/UserListCard";
import {
  getAllUserFavoritelists,
  getAllUserWatchlists,
} from "@/features/user-lists/services";
import type { UserListType } from "@/features/user-lists/types/user-list.type";
import { UrlPagination } from "@/components/UrlPagination";
import { checkIsNumberString } from "@/common/utils/check-is-number-string.util";
import styles from "./styles.module.scss";
import { userLists } from "@/features/user-lists/constants/user-lists.constant";
import { CreateUserListButton } from "@/features/user-lists/components/CreateUserListButton";

export default async function UserListsPage({
  params,
  searchParams,
}: PageProps<"/[locale]/user/[listType]">) {
  const { listType } = (await params) as { listType: UserListType };

  if (!userLists.has(listType)) {
    notFound();
  }

  const { page } = await searchParams;
  const currentPage =
    typeof page === "string" && checkIsNumberString(page) ? +page : 1;

  const t = await getTranslations("Lists");

  const fetchUserListsFn =
    listType === "favoritelists"
      ? getAllUserFavoritelists
      : getAllUserWatchlists;
  const response = await fetchUserListsFn({ page: currentPage, limit: 10 });

  if (response.status === "error") {
    return (
      <Alert
        content="An error occurred while fetching your lists."
        variant="error"
      />
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>
          {listType === "favoritelists"
            ? t("myFavoritelists")
            : t("myWatchlists")}
        </h1>
        <CreateUserListButton userListType={listType} />
      </div>
      {response.data.totalItems === 0 ? (
        <Alert content={t("noLists")} variant="warning" />
      ) : (
        <>
          <div className={styles.grid}>
            {response.data.items.map((list) => (
              <UserListCard
                key={list.id}
                id={list.id}
                name={list.name}
                createdAt={list.createdAt}
                userListType={listType as UserListType}
              />
            ))}
          </div>
          <UrlPagination
            totalPages={Math.ceil(
              response.data.totalItems / response.data.limit,
            )}
          />
        </>
      )}
    </div>
  );
}
