import type { TmdbPaginatedResponseType } from "@/common/types/tmdb-paginated-response.type";
import type { MovieCardType } from "./movie.type";

type PaginatedMoviesResponseType = TmdbPaginatedResponseType<MovieCardType>;

export type { PaginatedMoviesResponseType };
