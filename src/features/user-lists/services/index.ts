"use server";

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
  return await apiService<ListCreateResponseType>("/favoritelists/create", {
    method: "POST",
    withAuth: true,
    body: { name },
  });
};

const createUserWatchlist = async (name: string) => {
  return await apiService<ListCreateResponseType>("/watchlists/create", {
    method: "POST",
    withAuth: true,
    body: {
      name,
    },
  });
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
  return await apiService<SuccessResponseType>(
    `/favoritelists/delete/${listId}`,
    { method: "DELETE", withAuth: true },
  );
};

const deleteUserWatchlist = async (listId: number) => {
  return await apiService<SuccessResponseType>(`/watchlists/delete/${listId}`, {
    method: "DELETE",
    withAuth: true,
  });
};

// TODO: Will updating a user list feature be added?
const updateUserFavoritelist = async (listId: number, name: string) => {
  return await apiService<SuccessResponseType>(`/favoritelists/${listId}`, {
    method: "PATCH",
    withAuth: true,
    body: {
      name,
    },
  });
};

// TODO: Will updating a user list feature be added?
const updateUserWatchlist = async (listId: number, name: string) => {
  return await apiService<SuccessResponseType>(`/watchlists/${listId}`, {
    method: "PATCH",
    withAuth: true,
    body: {
      name,
    },
  });
};

const addMovieToUserFavoritelist = async (listId: number, tmdbId: number) => {
  return await apiService<SuccessResponseType>(
    `/favoritelists/${listId}/addMovie`,
    {
      method: "POST",
      withAuth: true,
      body: {
        tmdbId,
      },
    },
  );
};

const addMovieToUserWatchlist = async (listId: number, tmdbId: number) => {
  return await apiService<SuccessResponseType>(
    `/watchlists/${listId}/addMovie`,
    {
      method: "POST",
      withAuth: true,
      body: {
        tmdbId,
      },
    },
  );
};

const deleteMovieFromUserFavoritelist = async (
  listId: number,
  tmdbId: number,
) => {
  return await apiService<SuccessResponseType>(
    `/favoritelists/${listId}/deleteMovie/${tmdbId}`,
    {
      method: "DELETE",
      withAuth: true,
    },
  );
};

const deleteMovieFromUserWatchlist = async (listId: number, tmdbId: number) => {
  return await apiService<SuccessResponseType>(
    `/watchlists/${listId}/deleteMovie/${tmdbId}`,
    {
      method: "DELETE",
      withAuth: true,
    },
  );
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
