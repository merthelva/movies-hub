import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Plus } from "lucide-react";

import styles from "./styles.module.scss";

import { Alert } from "@/components/ui/Alert";
import { MovieCard } from "@/features/movies/components/MovieCard";
import {
  deleteMovieFromUserFavoritelist,
  deleteMovieFromUserWatchlist,
  getAllUserFavoritelistMovies,
  getAllUserWatchlistMovies,
} from "@/features/user-lists/services";
import { ScrollToTop } from "@/components/ScrollToTop";
import { UrlPagination } from "@/components/UrlPagination";
import pageStyles from "@/app/[locale]/user/[listType]/styles.module.scss";
import type { UserListType } from "@/features/user-lists/types/user-list.type";
import { userLists } from "@/features/user-lists/constants/user-lists.constant";
import { checkIsNumberString } from "@/common/utils/check-is-number-string.util";
import { NavLink } from "@/components/ui/NavLink";

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
    return <Alert content={t("fetchMoviesError")} variant="error" />;
  }

  return (
    <div className={pageStyles.page}>
      <ScrollToTop />
      <NavLink className={styles.link} href="/">
        <Plus size={18} />
        <span>{t("addMovieLink")}</span>
      </NavLink>
      {response.data.totalItems === 0 ? (
        <Alert content={t("emptyList")} variant="warning" />
      ) : (
        <div className={styles.pageContentWrapper}>
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
        </div>
      )}
    </div>
  );
}
