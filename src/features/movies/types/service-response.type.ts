import type { MovieCardType } from "./movie.type";

import type { TmdbPaginatedResponseType } from "@/common/types/tmdb-paginated-response.type";

type PaginatedMoviesResponseType = TmdbPaginatedResponseType<MovieCardType>;

export type { PaginatedMoviesResponseType };
