"use server";

import { revalidatePath } from "next/cache";

import { apiService } from "@/services/api";
import type {
  PaginatedUserListMoviesResponseType,
  PaginatedUserListsResponseType,
  UserListsWithMovieStatusResponseType,
} from "@/features/user-lists/types/service-response.type";
import type { ListCreateResponseType } from "@/features/user-lists/types/actions.type";
import type { SuccessResponseType } from "@/common/types/success-response.type";
import type { QueryParamsType } from "@/features/movies/types/query-params.type";
import type { LanguageType } from "@/common/types/language.type";

// Favorite lists and watchlists share the exact same API shape; only the
// endpoint prefix differs. Everything below is written once and parametrized by
// this prefix. Non-exported helpers are allowed in a "use server" file, only
// exports must be async functions (and become callable endpoints).
type ListKindType = "favoritelists" | "watchlists";

const DEFAULT_QUERY_PARAMS: QueryParamsType = { page: 1, limit: 10 };

const LIST_PAGE_PATTERN = "/[locale]/user/[listType]";
const LIST_MOVIES_PAGE_PATTERN = "/[locale]/user/[listType]/id/[listId]/movies";

const buildPaginationQuery = ({ page, limit }: QueryParamsType) => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", String(page));
  queryParams.set("limit", String(limit));
  return queryParams.toString();
};

const createList = async (
  kind: ListKindType,
  name: string,
  language?: LanguageType,
) => {
  const response = await apiService<ListCreateResponseType>(
    `/${kind}/create`,
    { method: "POST", withAuth: true, body: { name }, language },
  );

  if (response.status === "success") {
    revalidatePath(LIST_PAGE_PATTERN, "page");
  }

  return response;
};

const getAllLists = async (
  kind: ListKindType,
  params: QueryParamsType,
  language?: LanguageType,
) => {
  return await apiService<PaginatedUserListsResponseType>(
    `/${kind}/all?${buildPaginationQuery(params)}`,
    { withAuth: true, language },
  );
};

const getListMovies = async (
  kind: ListKindType,
  params: QueryParamsType,
  listId: number,
  language?: LanguageType,
) => {
  return await apiService<PaginatedUserListMoviesResponseType>(
    `/${kind}/${listId}?${buildPaginationQuery(params)}`,
    { withAuth: true, language },
  );
};

const deleteList = async (
  kind: ListKindType,
  listId: number,
  language?: LanguageType,
) => {
  const response = await apiService<SuccessResponseType>(
    `/${kind}/delete/${listId}`,
    { method: "DELETE", withAuth: true, language },
  );

  if (response.status === "success") {
    revalidatePath(LIST_PAGE_PATTERN, "page");
  }

  return response;
};

const updateList = async (
  kind: ListKindType,
  listId: number,
  name: string,
  language?: LanguageType,
) => {
  const response = await apiService<SuccessResponseType>(`/${kind}/${listId}`, {
    method: "PATCH",
    withAuth: true,
    body: { name },
    language,
  });

  if (response.status === "success") {
    revalidatePath(LIST_PAGE_PATTERN, "page");
  }

  return response;
};

const addMovieToList = async (
  kind: ListKindType,
  listId: number,
  tmdbId: number,
  language?: LanguageType,
) => {
  const response = await apiService<SuccessResponseType>(
    `/${kind}/${listId}/addMovie`,
    { method: "POST", withAuth: true, body: { tmdbId }, language },
  );

  if (response.status === "success") {
    revalidatePath(LIST_MOVIES_PAGE_PATTERN, "page");
  }

  return response;
};

const deleteMovieFromList = async (
  kind: ListKindType,
  listId: number,
  tmdbId: number,
  language?: LanguageType,
) => {
  const response = await apiService<SuccessResponseType>(
    `/${kind}/${listId}/deleteMovie/${tmdbId}`,
    { method: "DELETE", withAuth: true, language },
  );

  if (response.status === "success") {
    revalidatePath(LIST_MOVIES_PAGE_PATTERN, "page");
  }

  return response;
};

const getListsWithMovieStatus = async (
  kind: ListKindType,
  tmdbId: number,
  language?: LanguageType,
) => {
  return await apiService<UserListsWithMovieStatusResponseType>(
    `/${kind}/movieStatus/${tmdbId}`,
    { withAuth: true, language },
  );
};

// Public API: names and signatures are unchanged, so no caller needs editing.
// `typeof deleteUserFavoritelist` is used as a prop type elsewhere, so the two
// variants of each operation must keep identical signatures.

const createUserFavoritelist = async (name: string, language?: LanguageType) =>
  createList("favoritelists", name, language);

const createUserWatchlist = async (name: string, language?: LanguageType) =>
  createList("watchlists", name, language);

const getAllUserFavoritelists = async (
  params: QueryParamsType = DEFAULT_QUERY_PARAMS,
  language?: LanguageType,
) => getAllLists("favoritelists", params, language);

const getAllUserWatchlists = async (
  params: QueryParamsType = DEFAULT_QUERY_PARAMS,
  language?: LanguageType,
) => getAllLists("watchlists", params, language);

const getAllUserFavoritelistMovies = async (
  params: QueryParamsType = DEFAULT_QUERY_PARAMS,
  listId: number,
  language?: LanguageType,
) => getListMovies("favoritelists", params, listId, language);

const getAllUserWatchlistMovies = async (
  params: QueryParamsType = DEFAULT_QUERY_PARAMS,
  listId: number,
  language?: LanguageType,
) => getListMovies("watchlists", params, listId, language);

const deleteUserFavoritelist = async (listId: number, language?: LanguageType) =>
  deleteList("favoritelists", listId, language);

const deleteUserWatchlist = async (listId: number, language?: LanguageType) =>
  deleteList("watchlists", listId, language);

const updateUserFavoritelist = async (
  listId: number,
  name: string,
  language?: LanguageType,
) => updateList("favoritelists", listId, name, language);

const updateUserWatchlist = async (
  listId: number,
  name: string,
  language?: LanguageType,
) => updateList("watchlists", listId, name, language);

const addMovieToUserFavoritelist = async (
  listId: number,
  tmdbId: number,
  language?: LanguageType,
) => addMovieToList("favoritelists", listId, tmdbId, language);

const addMovieToUserWatchlist = async (
  listId: number,
  tmdbId: number,
  language?: LanguageType,
) => addMovieToList("watchlists", listId, tmdbId, language);

const deleteMovieFromUserFavoritelist = async (
  listId: number,
  tmdbId: number,
  language?: LanguageType,
) => deleteMovieFromList("favoritelists", listId, tmdbId, language);

const deleteMovieFromUserWatchlist = async (
  listId: number,
  tmdbId: number,
  language?: LanguageType,
) => deleteMovieFromList("watchlists", listId, tmdbId, language);

const getUserFavoritelistsWithMovieStatus = async (
  tmdbId: number,
  language?: LanguageType,
) => getListsWithMovieStatus("favoritelists", tmdbId, language);

const getUserWatchlistsWithMovieStatus = async (
  tmdbId: number,
  language?: LanguageType,
) => getListsWithMovieStatus("watchlists", tmdbId, language);

export {
  createUserFavoritelist,
  createUserWatchlist,
  getAllUserFavoritelists,
  getAllUserWatchlists,
  getAllUserFavoritelistMovies,
  getAllUserWatchlistMovies,
  deleteUserFavoritelist,
  deleteUserWatchlist,
  updateUserFavoritelist,
  updateUserWatchlist,
  addMovieToUserFavoritelist,
  addMovieToUserWatchlist,
  deleteMovieFromUserFavoritelist,
  deleteMovieFromUserWatchlist,
  getUserFavoritelistsWithMovieStatus,
  getUserWatchlistsWithMovieStatus,
};
