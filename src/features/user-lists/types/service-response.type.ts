import type { MovieDetailsType } from "@/features/movies/types/movie.type";
import type { ListCreateResponseType } from "./actions.type";
import type { PaginatedResponseType } from "./paginated-response.type";

type PaginatedUserListsResponseType =
  PaginatedResponseType<ListCreateResponseType>;

type PaginatedUserListMoviesResponseType =
  PaginatedResponseType<MovieDetailsType>;

type UserListsWithMovieStatusResponseType = Array<{
  id: number;
  name: string;
  hasMovie: boolean;
}>;

export type {
  PaginatedUserListsResponseType,
  PaginatedUserListMoviesResponseType,
  UserListsWithMovieStatusResponseType,
};
