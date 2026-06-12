import type { PaginatedResponseType } from "@/common/types/paginated-response.type";
import type { MovieCardType } from "./movie.type";

type PaginatedMoviesResponseType = PaginatedResponseType<MovieCardType>;

export type { PaginatedMoviesResponseType };
