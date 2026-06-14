import type { MovieDetailsType } from "@/features/movies/types/movie.type";
import type { ListCreateResponseType } from "./actions.type";
import type { PaginatedResponseType } from "./paginated-response.type";

type PaginatedUserListsResponseType =
  PaginatedResponseType<ListCreateResponseType>;

type PaginatedUserListMoviesResponseType =
  PaginatedResponseType<MovieDetailsType>;

// TODO: This service function might be unnecessary. If removed, get rid of all imports of this type as well.
type CheckIsMovieInUserListResponseType = {
  isMovieInList: boolean;
};

type UserListsWithMovieStatusResponseType = Array<{
  id: number;
  name: string;
  hasMovie: boolean;
}>;

export type {
  CheckIsMovieInUserListResponseType,
  PaginatedUserListsResponseType,
  PaginatedUserListMoviesResponseType,
  UserListsWithMovieStatusResponseType,
};
