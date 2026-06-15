import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { Alert } from "@/components/ui/Alert";
import { MovieCard } from "@/features/movies/components/MovieCard";
import {
  deleteMovieFromUserFavoritelist,
  deleteMovieFromUserWatchlist,
  getAllUserFavoritelistMovies,
  getAllUserWatchlistMovies,
} from "@/features/user-lists/services";
import { UrlPagination } from "@/components/UrlPagination";
import styles from "./styles.module.scss";
import type { UserListType } from "@/features/user-lists/types/user-list.type";
import { userLists } from "@/features/user-lists/constants/user-lists.constant";
import { checkIsNumberString } from "@/common/utils/check-is-number-string.util";

export default async function UserListMoviesPage({
  params,
  searchParams,
}: PageProps<"/[locale]/user/[listType]/id/[listId]/movies">) {
  const { listType, listId } = (await params) as {
    listType: UserListType;
    listId: string;
  };

  if (!userLists.has(listType) || !checkIsNumberString(listId)) {
    notFound();
  }

  const { page } = await searchParams;
  const currentPage =
    typeof page === "string" && checkIsNumberString(page) ? +page : 1;

  const t = await getTranslations("Lists");

  const fetchUserListMoviesFn =
    listType === "favoritelists"
      ? getAllUserFavoritelistMovies
      : getAllUserWatchlistMovies;
  const response = await fetchUserListMoviesFn(
    { page: currentPage, limit: 10 },
    +listId,
  );

  const deleteMovieFromUserListFn =
    listType === "favoritelists"
      ? deleteMovieFromUserFavoritelist
      : deleteMovieFromUserWatchlist;

  if (response.status === "error") {
    return (
      <Alert
        content="An error occurred while fetching movies for this list."
        variant="error"
      />
    );
  }

  return (
    <div className={styles.page}>
      {response.data.totalItems === 0 ? (
        <Alert content={t("emptyList")} variant="warning" />
      ) : (
        <>
          <div className={styles.grid}>
            {response.data.items.map((movie) => (
              <MovieCard
                key={movie.tmdbId}
                variant="protected"
                listId={+listId}
                movieId={movie.tmdbId}
                onDeleteMovieFromUserList={deleteMovieFromUserListFn}
                {...movie}
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
