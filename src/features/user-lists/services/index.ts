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

const createUserFavoritelist = async (name: string) => {
  const response = await apiService<ListCreateResponseType>(
    "/favoritelists/create",
    {
      method: "POST",
      withAuth: true,
      body: { name },
    },
  );

  if (response.status === "success") {
    revalidatePath("/[locale]/user/[listType]", "page");
  }

  return response;
};

const createUserWatchlist = async (name: string) => {
  const response = await apiService<ListCreateResponseType>(
    "/watchlists/create",
    {
      method: "POST",
      withAuth: true,
      body: {
        name,
      },
    },
  );

  if (response.status === "success") {
    revalidatePath("/[locale]/user/[listType]", "page");
  }

  return response;
};

const getAllUserFavoritelists = async (
  params: QueryParamsType = { page: 1, limit: 10 },
) => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", String(params.page));
  queryParams.set("limit", String(params.limit));
  const queryString = queryParams.toString();

  return await apiService<PaginatedUserListsResponseType>(
    `/favoritelists/all${queryString ? `?${queryString}` : ""}`,
    { withAuth: true },
  );
};

const getAllUserWatchlists = async (
  params: QueryParamsType = { page: 1, limit: 10 },
) => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", String(params.page));
  queryParams.set("limit", String(params.limit));
  const queryString = queryParams.toString();

  return await apiService<PaginatedUserListsResponseType>(
    `/watchlists/all${queryString ? `?${queryString}` : ""}`,
    {
      withAuth: true,
    },
  );
};

const getAllUserFavoritelistMovies = async (
  params: QueryParamsType = { page: 1, limit: 10 },
  listId: number,
) => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", String(params.page));
  queryParams.set("limit", String(params.limit));
  const queryString = queryParams.toString();

  return await apiService<PaginatedUserListMoviesResponseType>(
    `/favoritelists/${listId}${queryString ? `?${queryString}` : ""}`,
    { withAuth: true },
  );
};

const getAllUserWatchlistMovies = async (
  params: QueryParamsType = { page: 1, limit: 10 },
  listId: number,
) => {
  const queryParams = new URLSearchParams();
  queryParams.set("page", String(params.page));
  queryParams.set("limit", String(params.limit));
  const queryString = queryParams.toString();

  return await apiService<PaginatedUserListMoviesResponseType>(
    `/watchlists/${listId}${queryString ? `?${queryString}` : ""}`,
    { withAuth: true },
  );
};

const deleteUserFavoritelist = async (listId: number) => {
  const response = await apiService<SuccessResponseType>(
    `/favoritelists/delete/${listId}`,
    { method: "DELETE", withAuth: true },
  );

  if (response.status === "success") {
    revalidatePath("/[locale]/user/[listType]", "page");
  }

  return response;
};

const deleteUserWatchlist = async (listId: number) => {
  const response = await apiService<SuccessResponseType>(
    `/watchlists/delete/${listId}`,
    {
      method: "DELETE",
      withAuth: true,
    },
  );

  if (response.status === "success") {
    revalidatePath("/[locale]/user/[listType]", "page");
  }

  return response;
};

const updateUserFavoritelist = async (listId: number, name: string) => {
  const response = await apiService<SuccessResponseType>(
    `/favoritelists/${listId}`,
    {
      method: "PATCH",
      withAuth: true,
      body: {
        name,
      },
    },
  );

  if (response.status === "success") {
    revalidatePath("/[locale]/user/[listType]", "page");
  }

  return response;
};

const updateUserWatchlist = async (listId: number, name: string) => {
  const response = await apiService<SuccessResponseType>(
    `/watchlists/${listId}`,
    {
      method: "PATCH",
      withAuth: true,
      body: {
        name,
      },
    },
  );

  if (response.status === "success") {
    revalidatePath("/[locale]/user/[listType]", "page");
  }

  return response;
};

const addMovieToUserFavoritelist = async (listId: number, tmdbId: number) => {
  const response = await apiService<SuccessResponseType>(
    `/favoritelists/${listId}/addMovie`,
    {
      method: "POST",
      withAuth: true,
      body: {
        tmdbId,
      },
    },
  );

  if (response.status === "success") {
    revalidatePath("/[locale]/user/[listType]/id/[listId]/movies", "page");
  }

  return response;
};

const addMovieToUserWatchlist = async (listId: number, tmdbId: number) => {
  const response = await apiService<SuccessResponseType>(
    `/watchlists/${listId}/addMovie`,
    {
      method: "POST",
      withAuth: true,
      body: {
        tmdbId,
      },
    },
  );

  if (response.status === "success") {
    revalidatePath("/[locale]/user/[listType]/id/[listId]/movies", "page");
  }

  return response;
};

const deleteMovieFromUserFavoritelist = async (
  listId: number,
  tmdbId: number,
) => {
  const response = await apiService<SuccessResponseType>(
    `/favoritelists/${listId}/deleteMovie/${tmdbId}`,
    {
      method: "DELETE",
      withAuth: true,
    },
  );

  if (response.status === "success") {
    revalidatePath("/[locale]/user/[listType]/id/[listId]/movies", "page");
  }

  return response;
};

const deleteMovieFromUserWatchlist = async (listId: number, tmdbId: number) => {
  const response = await apiService<SuccessResponseType>(
    `/watchlists/${listId}/deleteMovie/${tmdbId}`,
    {
      method: "DELETE",
      withAuth: true,
    },
  );

  if (response.status === "success") {
    revalidatePath("/[locale]/user/[listType]/id/[listId]/movies", "page");
  }

  return response;
};

const getUserFavoritelistsWithMovieStatus = async (tmdbId: number) => {
  return await apiService<UserListsWithMovieStatusResponseType>(
    `/favoritelists/movieStatus/${tmdbId}`,
    {
      withAuth: true,
    },
  );
};

const getUserWatchlistsWithMovieStatus = async (tmdbId: number) => {
  return await apiService<UserListsWithMovieStatusResponseType>(
    `/watchlists/movieStatus/${tmdbId}`,
    {
      withAuth: true,
    },
  );
};

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
